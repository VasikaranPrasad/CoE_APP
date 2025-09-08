#!/usr/bin/env python3
import argparse
import os
from typing import Tuple

import cv2
import numpy as np
from PIL import Image

try:
    import mediapipe as mp
    _HAS_MEDIAPIPE = True
except Exception:
    _HAS_MEDIAPIPE = False


def read_image_bgr(path: str) -> np.ndarray:
    image = cv2.imdecode(np.fromfile(path, dtype=np.uint8), cv2.IMREAD_COLOR)
    if image is None:
        raise RuntimeError(f"Failed to read image: {path}")
    return image


def write_image_bgr(path: str, image: np.ndarray) -> None:
    ext = os.path.splitext(path)[1]
    success, buf = cv2.imencode(ext if ext else '.jpg', image, [int(cv2.IMWRITE_JPEG_QUALITY), 95])
    if not success:
        raise RuntimeError(f"Failed to encode image: {path}")
    with open(path, 'wb') as f:
        buf.tofile(f)


def resize_max_side(image: np.ndarray, max_side: int) -> Tuple[np.ndarray, float]:
    h, w = image.shape[:2]
    scale = 1.0
    if max(h, w) > max_side:
        scale = max_side / float(max(h, w))
        image = cv2.resize(image, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
    return image, scale


def apply_unsharp_mask(image: np.ndarray, amount: float = 0.5, radius: int = 3) -> np.ndarray:
    blurred = cv2.GaussianBlur(image, (0, 0), radius)
    sharp = cv2.addWeighted(image, 1 + amount, blurred, -amount, 0)
    return sharp


def vignette(image: np.ndarray, strength: float = 0.4) -> np.ndarray:
    h, w = image.shape[:2]
    y, x = np.ogrid[:h, :w]
    cy, cx = h / 2.0, w / 2.0
    dy = (y - cy) / (0.5 * h)
    dx = (x - cx) / (0.5 * w)
    mask = np.exp(-0.5 * (dx * dx + dy * dy))
    mask = (1 - strength) + strength * mask
    out = (image * mask[..., None]).astype(np.uint8)
    return out


def cinematic_grade(image: np.ndarray) -> np.ndarray:
    image_f = image.astype(np.float32) / 255.0
    # Subtle S-curve
    def s_curve(x, a=0.9):
        return 1 / (1 + np.exp(-8 * (x - 0.5))) ** a
    img = s_curve(image_f)

    # Teal and orange tint
    b, g, r = cv2.split(img)
    r = np.clip(r * 1.05 + 0.02, 0, 1)
    g = np.clip(g * 1.00 + 0.00, 0, 1)
    b = np.clip(b * 1.02 + 0.015, 0, 1)
    img = cv2.merge([b, g, r])

    # Mild vibrance
    hsv = cv2.cvtColor((img * 255).astype(np.uint8), cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[..., 1] = np.clip(hsv[..., 1] * 1.15, 0, 255)
    hsv[..., 2] = np.clip(hsv[..., 2] * 1.05, 0, 255)
    img = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)

    return img


def segment_person_mask(image: np.ndarray) -> np.ndarray:
    if not _HAS_MEDIAPIPE:
        # Fallback: simple edge-preserving mask (less accurate)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 60, 120)
        mask = cv2.GaussianBlur(edges, (21, 21), 0)
        mask = cv2.normalize(mask, None, 0, 255, cv2.NORM_MINMAX)
        return (mask > 30).astype(np.uint8) * 255

    mp_selfie = mp.solutions.selfie_segmentation
    with mp_selfie.SelfieSegmentation(model_selection=1) as selfie:
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        res = selfie.process(rgb)
        mask = (res.segmentation_mask * 255).astype(np.uint8)
        mask = cv2.GaussianBlur(mask, (21, 21), 0)
        _, bin_mask = cv2.threshold(mask, 128, 255, cv2.THRESH_BINARY)
        return bin_mask


def face_soften_and_pop(image: np.ndarray) -> np.ndarray:
    if not _HAS_MEDIAPIPE:
        return image
    mp_face = mp.solutions.face_mesh
    with mp_face.FaceMesh(static_image_mode=True, refine_landmarks=True, max_num_faces=10) as fm:
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        res = fm.process(rgb)
        if not res.multi_face_landmarks:
            return image
        mask = np.zeros(image.shape[:2], dtype=np.uint8)
        for fl in res.multi_face_landmarks:
            pts = [(int(p.x * image.shape[1]), int(p.y * image.shape[0])) for p in fl.landmark]
            hull = cv2.convexHull(np.array(pts))
            cv2.fillConvexPoly(mask, hull, 255)
        soft = cv2.bilateralFilter(image, d=9, sigmaColor=50, sigmaSpace=50)
        out = image.copy()
        soft_blend = cv2.seamlessClone(soft, image, mask, (image.shape[1]//2, image.shape[0]//2), cv2.NORMAL_CLONE)
        out = np.where(mask[..., None] > 0, soft_blend, image)
        # Add subtle eye pop by local contrast
        out = apply_unsharp_mask(out, amount=0.2, radius=1)
        return out


def depth_of_field(image: np.ndarray, subject_mask: np.ndarray, blur_strength: int = 21) -> np.ndarray:
    blur_strength = blur_strength + (1 - blur_strength % 2)  # ensure odd
    blurred = cv2.GaussianBlur(image, (blur_strength, blur_strength), 0)
    mask = cv2.GaussianBlur(subject_mask, (21, 21), 0)
    mask_f = (mask.astype(np.float32) / 255.0)[..., None]
    out = (image * mask_f + blurred * (1 - mask_f)).astype(np.uint8)
    return out


def add_letterbox(image: np.ndarray, target_ar: float = 2.0) -> np.ndarray:
    h, w = image.shape[:2]
    ar = w / float(h)
    if abs(ar - target_ar) < 0.05:
        return image
    # Add bars to reach target aspect ratio
    if ar > target_ar:
        # too wide, add bars top/bottom
        new_h = int(round(w / target_ar))
        pad = (new_h - h) // 2
        color = tuple(int(x) for x in np.median(image.reshape(-1, 3), axis=0))
        out = cv2.copyMakeBorder(image, pad, new_h - h - pad, 0, 0, cv2.BORDER_CONSTANT, value=color)
    else:
        # too tall, add bars left/right
        new_w = int(round(h * target_ar))
        pad = (new_w - w) // 2
        color = tuple(int(x) for x in np.median(image.reshape(-1, 3), axis=0))
        out = cv2.copyMakeBorder(image, 0, 0, pad, new_w - w - pad, cv2.BORDER_CONSTANT, value=color)
    return out


def process_image(input_path: str, output_path: str, max_side: int = 1920) -> None:
    img = read_image_bgr(input_path)
    img, _ = resize_max_side(img, max_side)

    # Subject segmentation and depth of field
    subj_mask = segment_person_mask(img)
    dof = depth_of_field(img, subj_mask, blur_strength=31)

    # Face-aware softening
    beauty = face_soften_and_pop(dof)

    # Cinematic grading and vignette
    graded = cinematic_grade(beauty)
    graded = vignette(graded, strength=0.35)

    # Subtle global sharpening
    final_img = apply_unsharp_mask(graded, amount=0.15, radius=1)

    # Letterbox for cinematic 2.0:1 look
    final_img = add_letterbox(final_img, target_ar=2.0)

    write_image_bgr(output_path, final_img)


def main():
    parser = argparse.ArgumentParser(description="Cinematic family photo enhancer")
    parser.add_argument("input", help="Path to input image")
    parser.add_argument("output", nargs="?", help="Path to save output image (default: *_cinematic.jpg)")
    parser.add_argument("--max-side", type=int, default=1920, help="Resize so the longest side equals this value")
    args = parser.parse_args()

    input_path = os.path.abspath(args.input)
    output_path = args.output or os.path.splitext(input_path)[0] + "_cinematic.jpg"

    process_image(input_path, output_path, max_side=args.max_side)
    print(f"Saved: {output_path}")


if __name__ == "__main__":
    main()