const express = require("express");

const postChecklistController = require("../../controller/DA_controller/postChecklistController");

const router = express.Router();

// Create a new checklist item

router.post("/postchecklist", postChecklistController.createpostChecklistItem);

// Get all checklist items

router.get("/postchecklist", postChecklistController.getAllpostChecklistItems);

// Get PD Dev checklist items

router.get("/postchecklist/pddev", postChecklistController.getPDDevpostChecklistItems);

// Get PD Lead checklist items

router.get("/postchecklist/pdlead", postChecklistController.getPDLeadpostChecklistItems);

module.exports = router;

