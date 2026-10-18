
import { useState } from "react";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState("");


  const addTask = () => {
    const text = inputText.trim();

    if (!text) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: text,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputText("");
  };


  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };


  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };


  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <div>
      <h2>Список задач</h2>

      <input
        type="text"
        placeholder="Введите задачу"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <button onClick={addTask}>Добавить</button>

      <p>
        Выполнено {completedCount} из {tasks.length}
      </p>

      {tasks.length === 0 ? (
        <p>Нет задач</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />

                <span
                  style={{
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.text}
                </span>
              </label>

              <button onClick={() => deleteTask(task.id)}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
