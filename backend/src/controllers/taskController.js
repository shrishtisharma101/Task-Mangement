
const Task = require("../models/Task");

const statuses = ["To Do", "In Progress", "Completed"];
const priorities = ["Low", "Medium", "High"];

exports.getTasks = async (req, res) => {
  try {
    const { search, status, priority } = req.query;

    const filter = { user: req.userId };

    if (search?.trim()) {
      filter.title = {
        $regex: search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        $options: "i",
      };
    }

    if (statuses.includes(status)) filter.status = status;
    if (priorities.includes(priority)) filter.priority = priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch tasks" });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Invalid task ID" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const {
      title,
      description = "",
      status = "To Do",
      priority = "Medium",
      dueDate,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }

    if (!statuses.includes(status) || !priorities.includes(priority)) {
      return res.status(400).json({
        message: "Invalid task status or priority",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description,
      status,
      priority,
      dueDate: dueDate || null,
      user: req.userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Could not create task" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const allowedFields = [
      "title",
      "description",
      "status",
      "priority",
      "dueDate",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.title !== undefined && !updates.title.trim()) {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    if (updates.title !== undefined) {
      updates.title = updates.title.trim();
    }

    if (
      (updates.status !== undefined &&
        !statuses.includes(updates.status)) ||
      (updates.priority !== undefined &&
        !priorities.includes(updates.priority))
    ) {
      return res.status(400).json({
        message: "Invalid task status or priority",
      });
    }

    if (updates.dueDate === "") updates.dueDate = null;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Could not update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Could not delete task" });
  }
};
