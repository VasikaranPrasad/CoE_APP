const User = require("../../modal/DA_model/user");

// User registration
const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const newUser = new User({ username, password, role });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register a user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    let role;
    if (user.role === "PD Dev") {
      role = "PD Dev";
    } else if (user.role === "PD Lead") {
      role = "PD Lead";
    }

    res.json({ message: "Login successful", role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ password: user.password});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve password' });
  }
};

module.exports = { registerUser, loginUser, forgotPassword  };