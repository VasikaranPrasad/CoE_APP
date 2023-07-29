const mongoose = require("mongoose");

const MasterDocumentSchema = new mongoose.Schema({
  addRun: { type: mongoose.Schema.Types.ObjectId, ref: 'Run' },
  designModel: { type: mongoose.Schema.Types.ObjectId, ref: 'Design' },
  designVariable: { type: mongoose.Schema.Types.ObjectId, ref: 'DesignVariable' }
});

module.exports = mongoose.model("MasterDocument", MasterDocumentSchema);
