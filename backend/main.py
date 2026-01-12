from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from typing import List

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # React access
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DATABASE ----------------
def get_db():
    conn = sqlite3.connect("tasks.db")
    conn.row_factory = sqlite3.Row
    return conn

# Create table
conn = get_db()
conn.execute("""
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    completed INTEGER,
    createdAt TEXT
)
""")
conn.close()

# ---------------- MODELS ----------------
class Task(BaseModel):
    title: str
    description: str
    completed: bool
    createdAt: str | None = None

class TaskResponse(Task):
    id: int

# ---------------- ROUTES ----------------

@app.get("/")
def root():
    return {"message": "Python backend running 🚀"}

@app.get("/tasks", response_model=List[TaskResponse])
def get_tasks():
    conn = get_db()
    rows = conn.execute("SELECT * FROM tasks").fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/tasks")
def add_task(task: Task):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tasks (title, description, completed, createdAt) VALUES (?, ?, ?, ?)",
        (
            task.title,
            task.description,
            int(task.completed),
            task.createdAt,
        ),
    )
    conn.commit()
    task_id = cursor.lastrowid
    conn.close()
    return {"id": task_id}

@app.put("/tasks/{task_id}")
def update_task(task_id: int, task: Task):
    conn = get_db()
    conn.execute(
        """
        UPDATE tasks
        SET title=?, description=?, completed=?
        WHERE id=?
        """,
        (
            task.title,
            task.description,
            int(task.completed),
            task_id,
        ),
    )
    conn.commit()
    conn.close()
    return {"success": True}

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    conn = get_db()
    conn.execute("DELETE FROM tasks WHERE id=?", (task_id,))
    conn.commit()
    conn.close()
    return {"success": True}
