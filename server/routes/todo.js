const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const cors = require("cors");

// Create a new todo
router.post("/add", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTodo = await Todo.create({ title, description, status });
    res.json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all todos
router.get("/fetch", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific todo by ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a todo
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Update with the provided data
      { new: true }
    );
    if (!updatedTodo)
      return res.status(404).json({ message: "Todo not found" });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo)
      return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid todo ID format" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
