import { useState } from "react";
import UserCard from "./UserCard";

function App() {
  const [age, setAge] = useState(29);
  const [color, setColor] = useState("#dcfce0");

  const changeAge = () => {
    setAge((prevAge) => prevAge + 1);
  };

  const changeColor = () => {
    setColor((prevColor) =>
      prevColor === "#dcfce0" ? "#dbeafe" : "#dcfce0"
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Домашнее задание: Props и ререндеринг</h1>

      <div style={{ marginBottom: "24px" }}>
        <button onClick={changeAge}>
          Изменить возраст
        </button>

        <button
          onClick={changeColor}
          style={{ marginLeft: "12px" }}
        >
          Изменить цвет
        </button>
      </div>

      <UserCard
        name="Иван Петров"
        age={age}
        color={color}
      />
    </div>
  );
}

export default App;
