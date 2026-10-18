let num1 = prompt('Введите первое число');
let num2 = prompt('Введите второе число');

let number1 = Number(num1);
let number2 = Number(num2);

if (num1 === null || num2 === null ||
    num1.trim() === "" || num2.trim() === "" ||
    isNaN(number1) || isNaN(number2)) {
    console.log("Ошибка: введите корректные числа.");
} else if (number2 === 0) {
    console.log("Ошибка: деление на ноль невозможно.");
} else {
    if (number1 % number2 === 0) {
        console.log(`Число ${number1} делится на ${number2} без остатка.`);
    } else {
        console.log(`Число ${number1} не делится на ${number2}. Остаток: ${number1 % number2}.`);
    }
}