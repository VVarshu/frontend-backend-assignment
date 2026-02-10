import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles/app.css";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // new state for description
  const [search, setSearch] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      alert("Failed to fetch tasks");
    }
  };

  // Add new task
  const addTask = async () => {
    if (!title || !description) return;
    await api.post("/tasks", { title, description });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // Start editing
  const editTask = (task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description || "");
  };

  // Update task
  const updateTask = async () => {
    if (!title || !description) return;
    await api.put(`/tasks/${editingTaskId}`, { title, description });
    setEditingTaskId(null);
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Tasks</h1>

        {/* Search Bar */}
        <div className="search-container">
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Task Form */}
        <div className="task-form card">
          <input
            placeholder={editingTaskId ? "Edit task title" : "New task title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder={editingTaskId ? "Edit description" : "Task description"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {editingTaskId ? (
            <button onClick={updateTask}>Update Task</button>
          ) : (
            <button onClick={addTask}>Add Task</button>
          )}
        </div>

        {/* Task List */}
        <div className="tasks-list">
          {tasks
            .filter((t) =>
              t.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((t) => (
              <div key={t.id} className="card task-card">
                <div>
                  <p><strong>{t.title}</strong></p>
                  <p>{t.description}</p> {/* show description */}
                </div>
                <div className="task-buttons">
                  <button onClick={() => editTask(t)}>Edit</button>
                  <button onClick={() => deleteTask(t.id)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
