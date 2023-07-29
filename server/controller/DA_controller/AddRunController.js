const Run = require("../../modal/DA_model/AddRunDetails");

exports.createRun = async (req, res) => {
  try {
    const { designName, runName, directory, fm, da, dd } = req.body;

    // Check if the runName already exists

    const existingRun = await Run.findOne({ runName });

    if (existingRun) {
      return res.status(400).json({ error: "Run name already exists" });
    }

    const run = new Run({ designName, runName, directory, fm, da, dd });

    await run.save();

    res.status(201).json(run);
  } catch (err) {
    console.error("Failed to create run:", err);

    res.status(500).json({ error: "Failed to create run" });
  }
};

// Get all runs with design name, run name, and directory
exports.getAllRuns = async (req, res) => {
  try {
    const runs = await Run.find().select("designName runName directory");
    res.json(runs);
  } catch (err) {
    console.error("Failed to fetch runs:", err);
    res.status(500).json({ error: "Failed to fetch runs" });
  }
};
