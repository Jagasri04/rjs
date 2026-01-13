// import { useState, useEffect } from "react";
// import "./App.css";
// import Layout from "./Layout";
// import Dashboard from "./components/Dashboard";

// type Task = {
//   id: number;
//   title: string;
//   description: string;
//   completed: boolean;
//   createdAt: string;
// };

// function App() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [completed, setCompleted] = useState(false);
//   const [editId, setEditId] = useState<number | null>(null);
//   const [alertMessage, setAlertMessage] = useState("");

//   // 🔹 PAGE STATE (UPDATED)
//   const [activePage, setActivePage] =
//     useState<"home" | "dashboard" | "tasks">("home");

//   // 🔹 FETCH TASKS
//   useEffect(() => {
//     fetch("http://localhost:5000/tasks")
//       .then((res) => res.json())
//       .then((data) => setTasks(data))
//       .catch(console.error);
//   }, []);

//   // 🔹 ADD / UPDATE TASK
//   const handleAddTask = async () => {
//     if (!title.trim()) return;

//     if (editId !== null) {
//       await fetch(`http://localhost:5000/tasks/${editId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, description, completed }),
//       });

//       setTasks(
//         tasks.map((task) =>
//           task.id === editId
//             ? { ...task, title, description, completed }
//             : task
//         )
//       );
//       setEditId(null);
//     } else {
//       const newTask = {
//         title,
//         description,
//         completed,
//         createdAt: new Date().toLocaleString(),
//       };

//       const res = await fetch("http://localhost:5000/tasks", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newTask),
//       });

//       const data = await res.json();
//       setTasks([...tasks, { ...newTask, id: data.id }]);
//     }

//     setTitle("");
//     setDescription("");
//     setCompleted(false);
//     setEditId(null);
//     setAlertMessage(editId?"Task Updated Successfully":"Task added successfully");
//     setTimeout(()=>{setAlertMessage("");},3000);
//   };

//   return (
//     <Layout activePage={activePage} setActivePage={setActivePage}>
//       {/* ================= HOME (FORM ONLY) ================= */}
//       {activePage === "home" && (
//         <div className="app-container">
//           <h2>Task Management System</h2>
//           <h3>{editId ? "Edit Task" : "Add New Task"}</h3>
//           {alertMessage&&(
//             <div style = {{
//               backgroundColor: "#dcfce7",
//               color: "#166534",
//               padding:"10px",
//               borderRadius:"6px",
//               marginBottom:"15px",
//               fontWeight:"500",
//             }}>
//               {alertMessage}
//               </div>
//           )}

//           <div className="form-section">
//             <label>Task Title</label>
//             <input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <label>Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />

//             <div className="checkbox-row">
//               <input
//                 type="checkbox"
//                 checked={completed}
//                 onChange={(e) => setCompleted(e.target.checked)}
//               />
//               <span>Completed</span>
//             </div>

//             <div className="button-row">
//               <button onClick={handleAddTask}>
//                 {editId ? "Update Task" : "Add Task"}
//               </button>
//               <button
//                 onClick={() => {
//                   setTitle("");
//                   setDescription("");
//                   setCompleted(false);
//                   setEditId(null);
//                 }}
//               >
//                 Reset
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ================= TASK LIST (TABLE ONLY) ================= */}
//       {activePage === "tasks" && (
//         <div className="app-container">
//           <h2>Task List</h2>

//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th>Completed</th>
//                 <th>Created At</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {tasks.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} style={{ textAlign: "center" }}>
//                     No tasks added
//                   </td>
//                 </tr>
//               ) : (
//                 tasks.map((task, index) => (
//                   <tr key={task.id}>
//                     <td>{index + 1}</td>
//                     <td>{task.title}</td>
//                     <td>{task.description}</td>
//                     <td>{task.completed ? "Yes" : "No"}</td>
//                     <td>{task.createdAt}</td>
//                     <td>
//                       <button
//                         onClick={() => {
//                           setEditId(task.id);
//                           setTitle(task.title);
//                           setDescription(task.description);
//                           setCompleted(task.completed);
//                           setActivePage("home");
//                         }}
//                       >
//                         Edit
//                       </button>

//                       <button
//                         style={{ marginLeft: "5px" }}
//                         onClick={async () => {
//                           await fetch(
//                             `http://localhost:5000/tasks/${task.id}`,
//                             { method: "DELETE" }
//                           );
//                           setTasks(tasks.filter((t) => t.id !== task.id));
//                         }}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ================= DASHBOARD ================= */}
//       {activePage === "dashboard" && <Dashboard tasks={tasks} />}
//     </Layout>
//   );
// }

// export default App;



import { useState, useEffect } from "react";
import "./App.css";
import Layout from "./Layout";
import Dashboard from "./components/Dashboard";

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
  const [alertMessage, setAlertMessage] = useState("");

  const [activePage, setActivePage] =
    useState<"home" | "dashboard" | "tasks">("home");

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(console.error);
  }, []);

  const handleAddTask = async () => {
    if (!title.trim()) return;

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
    } else {
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

    setTitle("");
    setDescription("");
    setCompleted(false);
    setEditId(null);

    setAlertMessage(
      editId ? "Task Updated Successfully" : "Task Added Successfully"
    );
    setTimeout(() => setAlertMessage(""), 3000);
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {activePage === "home" && (
        <div className="app-container">
          <h2>Task Management System</h2>

          {alertMessage && <div className="alert">{alertMessage}</div>}

          <div className="form-section">
            <label>Task Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />

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
        </div>
      )}

      {activePage === "tasks" && (
        <div className="app-container">
          <h2>Task List</h2>

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
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.completed ? "Yes" : "No"}</td>
                  <td>{task.createdAt}</td>

                  {/* ✅ FIXED ACTIONS COLUMN */}
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditId(task.id);
                          setTitle(task.title);
                          setDescription(task.description);
                          setCompleted(task.completed);
                          setActivePage("home");
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activePage === "dashboard" && <Dashboard tasks={tasks} />}
    </Layout>
  );
}

export default App;
