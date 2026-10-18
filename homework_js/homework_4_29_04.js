let users = [];

function addUser(name, age) {

    if (name === null || name.trim() === "") {
        console.log("Ошибка: имя не может быть пустым.");
        return;
    }

    let ageNum = Number(age);

    if (age === null || isNaN(ageNum)) {
        console.log("Ошибка: введите корректный возраст.");
        return;
    }

    const exists = users.some(user => user.name === name);
    if (exists) {
        console.log("Пользователь с таким именем уже существует.");
        return;
    }

    users.push({ name, age });
    console.log(`Пользователь ${name} добавлен.`);
}

function removeUser(name) {
    const index = users.findIndex(user => user.name === name);
    if (index === -1) {
        console.log("Пользователь не найден.");
        return;
    }
    users.splice(index, 1);
    console.log(`Пользователь ${name} удалён.`);
}

function getUserInfo(name) {
    const user = users.find(user => user.name === name);

    if (!user) {
        console.log(`Пользователь ${name} не найден.`);
        return;
    }

    console.log(`Имя: ${user.name}, Возраст: ${user.age}`);
}


addUser("Анна", 25);
addUser("Иван", 30);

getUserInfo("Анна"); 

removeUser("Иван");

getUserInfo("Иван"); 

addUser("Анна", 28); 