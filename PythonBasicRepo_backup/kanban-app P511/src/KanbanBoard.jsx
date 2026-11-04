import { useState, useEffect } from "react";
import "./KanbanBoard.css";

const COLUMNS = [
  { id: "TODO", title: "🎯 Нужно сделать", color: "#ff4d4d" },
  { id: "IN_PROGRESS", title: "⚡ В работе", color: "#ff944d" },
  { id: "REVIEW", title: "👀 На проверке", color: "#3399ff" },
  { id: "DONE", title: "✅ Готово", color: "#2eb8b8" },
];

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Изучить React Drag & Drop",
    desc: "Разобраться с нативными событиями браузера",
    column: "TODO",
    priority: "high",
  },
  {
    id: "2",
    title: "Сделать крутой интерфейс",
    desc: "Добавить темную тему и сочные цвета",
    column: "IN_PROGRESS",
    priority: "medium",
  },
];

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("kanban_tasks");
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [newTask, setNewTask] = useState({
    title: "",
    desc: "",
    priority: "medium",
    column: "TODO",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
    e.currentTarget.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("dragging");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, column: targetColumn } : t)),
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    setTasks((prev) => [...prev, { id: Date.now().toString(), ...newTask }]);
    setNewTask({ title: "", desc: "", priority: "medium", column: "TODO" });
    setShowForm(false);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="kanban-container">
      <header className="kanban-header">
        <h1>📋 Моя Канбан Доска</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Скрыть форму" : "+ Новая задача"}
        </button>
      </header>

      {showForm && (
        <form className="task-form" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Название задачи..."
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Описание..."
            value={newTask.desc}
            onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
          />
          <div className="form-row">
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
            >
              <option value="low">Низкий приоритет</option>
              <option value="medium">Средний приоритет</option>
              <option value="high">Высокий приоритет</option>
            </select>
            <select
              value={newTask.column}
              onChange={(e) =>
                setNewTask({ ...newTask, column: e.target.value })
              }
            >
              {COLUMNS.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-submit">
            Добавить задачу в список
          </button>
        </form>
      )}

      <div className="kanban-board">
        {COLUMNS.map((column) => {
          const columnTasks = tasks.filter((t) => t.column === column.id);
          return (
            <div
              key={column.id}
              className="kanban-column"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div
                className="column-header"
                style={{ borderTop: `4px solid ${column.color}` }}
              >
                <h3>{column.title}</h3>
                <span className="task-count">{columnTasks.length}</span>
              </div>
              <div className="column-body">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`task-card dragging-target`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="task-card-header">
                      <span className={`badge ${task.priority}`}>
                        {task.priority}
                      </span>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        ×
                      </button>
                    </div>
                    <h4>{task.title}</h4>
                    <p>{task.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
