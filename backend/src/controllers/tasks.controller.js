const db = require("../config/db");

/**
 * CREATE TASK
 */
exports.createTask = (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const query =
    "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)";

  db.query(query, [title, description, userId], (err, result) => {
    if (err) {
      console.error("Create task error:", err);
      return res.status(500).json({ message: "Failed to create task" });
    }

    res.status(201).json({
      message: "Task created successfully",
      taskId: result.insertId
    });
  });
};

/**
 * GET ALL TASKS (for logged-in user)
 */
exports.getTasks = (req, res) => {
  const userId = req.user.id;

  const query = "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Fetch tasks error:", err);
      return res.status(500).json({ message: "Failed to fetch tasks" });
    }

    res.json(results);
  });
};

/**
 * UPDATE TASK
 */
exports.updateTask = (req, res) => {
  const { title, description } = req.body;
  const taskId = req.params.id;
  const userId = req.user.id;

  const query =
    "UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?";

  db.query(query, [title, description, taskId, userId], (err, result) => {
    if (err) {
      console.error("Update task error:", err);
      return res.status(500).json({ message: "Failed to update task" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully" });
  });
};

/**
 * DELETE TASK
 */
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  const query = "DELETE FROM tasks WHERE id = ? AND user_id = ?";

  db.query(query, [taskId, userId], (err, result) => {
    if (err) {
      console.error("Delete task error:", err);
      return res.status(500).json({ message: "Failed to delete task" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  });
};
