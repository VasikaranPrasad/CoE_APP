const Checklist = require("../../modal/DA_model/Checklist");

const User = require("../../modal/DA_model/user");

// Function to calculate the percentage based on the number of answered questions
const calculatePercentage = (answers, questions) => {
  const totalQuestions = questions.length;
  const answeredQuestions = Object.keys(answers).filter((key) => answers[key] === "YES").length;
  const percentage = (answeredQuestions / totalQuestions) * 100;
  return percentage.toFixed(2);
};

exports.createChecklistItem = async (req, res) => {
  try {
    const { userRole } = req.body;

    const { data, pdDev, devComments, pdLead, pdLeadComments } = req.body.answers;

    const questions = req.body.questions.map((question) => question.text);

    const questionsObj = new Map();
    questions.forEach((question, index) => {
      questionsObj.set(`question${index + 1}`, question);
    });

    let checklistItem;

    if (userRole === "PD Dev") {
      // Find the latest PD Dev checklist item
      const pdDevItem = await Checklist.findOne({ userRole: "PD Dev" }).sort({ _id: -1 });

      if (pdDevItem) {
        // Update the existing PD Dev checklist item with new data and percentage
        pdDevItem.data = data;
        pdDevItem.pdDev = new Map(Object.entries(pdDev));
        pdDevItem.devComments = new Map(Object.entries(devComments));
        pdDevItem.questions = questionsObj;
        pdDevItem.percentage = calculatePercentage(req.body.answers, questions);
        checklistItem = pdDevItem;
      } else {
        // Create a new PD Dev checklist item
        checklistItem = new Checklist({
          userRole,
          data,
          pdDev: new Map(Object.entries(pdDev)),
          devComments: new Map(Object.entries(devComments)),
          questions: questionsObj,
          percentage: calculatePercentage(req.body.answers, questions),
        });
      }
    } else if (userRole === "PD Lead") {
      // Find the latest PD Lead checklist item
      const pdLeadItem = await Checklist.findOne({ userRole: "PD Lead" }).sort({ _id: -1 });

      if (pdLeadItem) {
        // Update the existing PD Lead checklist item with new data and percentage
        pdLeadItem.data = data;
        pdLeadItem.pdLead = new Map(Object.entries(pdLead));
        pdLeadItem.pdLeadComments = new Map(Object.entries(pdLeadComments));
        pdLeadItem.questions = questionsObj;
        pdLeadItem.percentage = calculatePercentage(req.body.answers, questions);
        checklistItem = pdLeadItem;
      } else {
        // Create a new PD Lead checklist item
        checklistItem = new Checklist({
          userRole,
          data,
          pdLead: new Map(Object.entries(pdLead)),
          pdLeadComments: new Map(Object.entries(pdLeadComments)),
          questions: questionsObj,
          percentage: calculatePercentage(req.body.answers, questions),
        });
      }
    } else {
      // Invalid user role
      return res.status(400).json({ error: "Invalid user role" });
    }

    await checklistItem.save();

    res.status(201).json({ message: "Checklist item created/updated successfully" });
  } catch (error) {
    console.error("Error creating/updating checklist item:", error);
    res.status(500).json({ error: "An error occurred while creating/updating the checklist item" });
  }
};


exports.getAllChecklistItems = async (req, res) => {
  try {
    const pdDevItem = await Checklist.findOne({ userRole: "PD Dev" })
      .sort({ _id: -1 })
      .limit(1);

    const pdLeadItem = await Checklist.findOne({ userRole: "PD Lead" })
      .sort({ _id: -1 })
      .limit(1);

    const checklistItems = {
      pdDev: pdDevItem || null,

      pdLead: pdLeadItem || null,
    };

    res.status(200).json(checklistItems);
  } catch (error) {
    console.error("Error retrieving checklist items:", error);

    res.status(500).json({ error: "Server error" });
  }
};

exports.getPDDevChecklistItems = async (req, res) => {
  try {
    const pdDevItem = await Checklist.findOne({ userRole: "PD Dev" })
      .sort({ _id: -1 })
      .limit(1);

    if (!pdDevItem) {
      return res.status(404).json({ error: "No PD Dev checklist item found" });
    }

    res.status(200).json(pdDevItem);
  } catch (error) {
    console.error("Error retrieving PD Dev checklist item:", error);

    res.status(500).json({ error: "Server error" });
  }
};

exports.getPDLeadChecklistItems = async (req, res) => {
  try {
    const pdLeadItem = await Checklist.findOne({ userRole: "PD Lead" })
      .sort({ _id: -1 })
      .limit(1);

    if (!pdLeadItem) {
      return res.status(404).json({ error: "No PD Lead checklist item found" });
    }

    res.status(200).json(pdLeadItem);
  } catch (error) {
    console.error("Error retrieving PD Lead checklist item:", error);

    res.status(500).json({ error: "Server error" });
  }
};
