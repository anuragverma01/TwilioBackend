const { User } = require("../models/User.js");

const register = async (req, res) => {
  try {
    const { username, firstName, lastName, email } = req.body;
    // console.log(req.body, req.file);

    const picturePath = req?.file && req?.file?.path ? req.file.path : "";

    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      picturePath,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log("error", err.message);
    res.status(500).json({
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username } = req.body;
    console.log(req.body);
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({
        msg: "User does not exist",
      });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const { userId } = req.body;
    const users = await User.find({ _id: { $ne: userId } });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = { register, login, getUsers };
