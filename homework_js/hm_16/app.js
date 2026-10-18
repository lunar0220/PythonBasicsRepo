const nameInput = document.querySelector(".name-input");
const agreeCheckbox = document.querySelector(".agree-checkbox");
const validateButton = document.querySelector(".validate-button");

validateButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const isAgree = agreeCheckbox.checked;

    if (name === "") {
        console.log("Ошибка: введите имя.");
        return;
    }

    if (!isAgree) {
        console.log("Ошибка: необходимо согласиться с условиями.");
        return;
    }

    console.log("Регистрация прошла успешно!");
    console.log("Имя:", name);
    console.log("Согласие:", isAgree);
});