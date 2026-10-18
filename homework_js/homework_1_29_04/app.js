let name = prompt("Введите ваше имя:");

let age = prompt('Введите ваш возраст:');
let ageNum = Number(age);

if(age === null || age.trim() === "" || isNaN(ageNum)){
    console.log("Ошибка: введите число.")
} else {console.log(`Привет, ${name}! Тебе ${ageNum} лет.`)}