// app.tsx

import { useState, useEffect } from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // FETCH TASKS
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  // ADD / UPDATE TASK
  const handleAddTask = async () => {
    if (!title.trim()) return;

    //  UPDATE MODE
    if (editId !== null) {
      await fetch(`http://localhost:5000/tasks/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, completed }),
      });

      setTasks(
        tasks.map((task) =>
          task.id === editId
            ? { ...task, title, description, completed }
            : task
        )
      );

      setEditId(null);
    }
    // ADD MODE
    else {
      const newTask = {
        title,
        description,
        completed,
        createdAt: new Date().toLocaleString(),
      };

      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const data = await res.json();
      setTasks([...tasks, { ...newTask, id: data.id }]);
    }

    // RESET FORM
    setTitle("");
    setDescription("");
    setCompleted(false);
    setEditId(null);
  };

  return (
    <div className="app-container">
      <h2>Task Management System</h2>

      <h3>{editId ? "Edit Task" : "Add New Task"}</h3>

      {/* FORM */}
      <div className="form-section">
        <label>Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="checkbox-row">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <span>Completed</span>
        </div>

        <div className="button-row">
          <button onClick={handleAddTask}>
            {editId ? "Update Task" : "Add Task"}
          </button>
          <button
            onClick={() => {
              setTitle("");
              setDescription("");
              setCompleted(false);
              setEditId(null);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <h3 style={{ marginTop: "40px" }}>Task List</h3>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No tasks added
              </td>
            </tr>
          ) : (
            tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.completed ? "Yes" : "No"}</td>
                <td>{task.createdAt}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditId(task.id);
                      setTitle(task.title);
                      setDescription(task.description);
                      setCompleted(task.completed);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={async () => {
                      await fetch(
                        `http://localhost:5000/tasks/${task.id}`,
                        { method: "DELETE" }
                      );
                      setTasks(tasks.filter((t) => t.id !== task.id));
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
