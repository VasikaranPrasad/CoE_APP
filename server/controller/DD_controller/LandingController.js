const mongoose = require("mongoose");
// const Course = require('../Models/Courses');
const AddrunModel = require("../../modal/DA_model/AddRunDetails");

const getLandingRun = async (req, res) => {
  try {
    const result = await AddrunModel.find();
    
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getLandingRun };
