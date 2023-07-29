const express = require('express');
const router = express.Router();
const runController = require('../../controller/DA_controller/AddRunController');

// Create a new run with design name, run name, and directory
router.post('/CreateAddRun', runController.createRun);

// Get all runs with design name, run name, and directory
router.get('/GetAddRun', runController.getAllRuns);

module.exports = router;
