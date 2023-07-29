const mongoose = require("mongoose");

const runSchema = new mongoose.Schema({
  designName: { type: String },
  runName: { type: String },
  directory: { type: String },
  fm: { type: Boolean, default: false },
  dd: { type: Boolean, default: false},
  da: { type: Boolean, default: false }
  // Add other fields as needed
});

module.exports = mongoose.model("Run", runSchema);
