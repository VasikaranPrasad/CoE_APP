const express = require('express');
const router = express.Router();

const landController = require('../../controller/DD_controller/LandingController')

// Create a new run with design name, run name, and directory
router.get('/landingrun', landController.getLandingRun);

// Get all runs with design name, run name, and directory
  

module.exports = router;
