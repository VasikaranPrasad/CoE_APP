const mongoose = require("mongoose");

const checklistSchema = new mongoose.Schema({
  userRole: {
    type: String,

    required: true,
  },

  data: {
    type: String,

    default: "NA",
  },

  pdDev: {
    type: Map,

    of: String,
  },

  devComments: {
    type: Map,

    of: String,
  },

  pdLead: {
    type: Map,

    of: String,
  },

  pdLeadComments: {
    type: Map,

    of: String,
  },

  questions: {
    type: Map,

    of: String,
  },
  percentage: {
    type: Number, // Change the data type to Number // Set a default value if needed
  },
});

const Checklist = mongoose.model("Checklist", checklistSchema);

module.exports = Checklist;
