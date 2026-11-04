import React from 'react';


function ButtonWithCallback({ onButtonClick }) {
  return (
    <button onClick={() => onButtonClick("Кнопка была нажата!")}>
      Нажми меня
    </button>
  );
}


function App() {
  const handleClick = (message) => {
    console.log(message);
  };

  return (
    <div>
      <h1>Домашнее задание: Передача callback через props</h1>

      <ButtonWithCallback onButtonClick={handleClick} />
    </div>
  );
}

export default App;