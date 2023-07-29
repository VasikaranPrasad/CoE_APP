const express = require("express");

const checklistController = require("../../controller/DA_controller/checklistController");

const router = express.Router();

// Create a new checklist item

router.post("/checklist", checklistController.createChecklistItem);

// Get all checklist items

router.get("/checklist", checklistController.getAllChecklistItems);

// Get PD Dev checklist items

router.get("/checklist/pddev", checklistController.getPDDevChecklistItems);

// Get PD Lead checklist items

router.get("/checklist/pdlead", checklistController.getPDLeadChecklistItems);

module.exports = router;
