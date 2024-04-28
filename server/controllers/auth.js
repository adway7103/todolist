const User = require("../models/user");
const jwt = require("jsonwebtoken");
const test = (req, res) => {
  res.json("Test is working");
};
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.json({ error: "Name is required" });
    }
    const exist = await User.findOne({ username });
    if (exist) return res.json({ error: "You are already registered" });
    const user = await User.create({ username, password });
    return res.json(user);
  } catch (err) {
    console.log(err);
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) return res.json({ error: "Username is required" });
    if (!password) return res.json({ error: "Password is required" });
    const user = await User.findOne({ username });
    if (!user) return null;
    if (user.password == password) {
      jwt.sign({ user: User.username }, process.env.JWT, {}, (err, token) => {
        res.cookie("token", token).json(user);
      });
    } else return res.json({ error: "Invalid username or password" });
  } catch (error) {
    console.log(error);
  }
};
const getProfile = async (req, res) => {
  const token = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT, {}, (err, user) => {
      res.json(user);
    });
  } else {
    res.json(null);
  }
};
module.exports = { test, registerUser, loginUser, getProfile };
