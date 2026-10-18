const form = document.getElementById("userForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const ageValue = document.getElementById("age").value.trim();

    const age = Number(ageValue);

    if (name === "") {
        message.textContent = "Ошибка: введите имя.";
        return;
    }

    if (isNaN(age) || age <= 0) {
        message.textContent = "Ошибка: возраст должен быть положительным числом.";
        return;
    }

    message.textContent = `Здравствуйте, ${name}! Вам ${age} лет.`;
});