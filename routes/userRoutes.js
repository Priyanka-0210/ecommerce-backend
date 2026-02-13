const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Create user
router.post("/", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// Get all users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
