
import React from 'react';


function FruitList({ fruits }) {
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}


function App() {
  const fruits = [
    "Яблоко",
    "Банан",
    "Апельсин",
    "Киви",
    "Виноград"
  ];

  return (
    <div>
      <h1>Домашнее задание: Рендеринг списков</h1>
      <FruitList fruits={fruits} />
    </div>
  );
}

export default App;
