const User = require("../models/user");
const test = (req, res) => {
  res.json("Test is working");
};
const registerUser = async (req, res) => {
  try {
    const [username, password] = req.body;
    const user = await User.create({ username, password });
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
};
module.exports = { test, registerUser };
