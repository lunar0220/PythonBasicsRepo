let totalChars = 0;

while (true) {
    let input = prompt("Введите строку:");

    if (input === null) {
        break;
    }
    if (input.toLowerCase() === "стоп") {
        break;
    }

    totalChars += input.length;
}

console.log("Количество символов (без пробелов): " + totalChars);