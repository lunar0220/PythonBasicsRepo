import './index.css';

let clickCount = 0;

function App() {
    function handleClick() {
        clickCount++;

        console.log('Нажатий:', clickCount);
    }

    function handleChange(event) {
        console.log('Имя:', event.target.value);
    }

    function handleMouseOver() {
        console.log('Мышь наведена!');
    }

    return (
        <div className="App">
            <h1>Работа с событиями в React</h1>

            <section>
                <button onClick={handleClick}>
                    Нажми меня
                </button>

                <p>Количество нажатий смотрите в консоли</p>
            </section>

            <section>
                <input
                    type="text"
                    placeholder="Введите имя"
                    onChange={handleChange}
                />

                <p>Смотрите имя в консоли</p>
            </section>

            <section>
                <div
                    className="highlight"
                    onMouseOver={handleMouseOver}
                >
                    Наведи на меня
                </div>
            </section>
        </div>
    );
}

export default App;