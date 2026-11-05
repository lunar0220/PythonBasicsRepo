import React, { useState } from 'react';
import './index.css';

function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(prevCount => prevCount + step);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - step);
  };

  const reset = () => {
    setCount(initialValue);
  };

  return {
    count,
    increment,
    decrement,
    reset
  };
}

function App() {
  const {
    count,
    increment,
    decrement,
    reset
  } = useCounter(0, 1);

  return (
    <div className="counter-container">
      <div className="counter-card">

        <h1>Домашнее задание: useCounter</h1>

        <p className="counter-label">
          Текущее значение:
        </p>

        <div className="counter-value">
          {count}
        </div>

        <div className="counter-buttons">
          <button className="increase" onClick={increment}>
            + Увеличить
          </button>

          <button className="decrease" onClick={decrement}>
            − Уменьшить
          </button>

          <button className="reset" onClick={reset}>
            ↻ Сбросить
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
