function askMood(mood, callback) {
    callback(mood);
}

let mood = prompt("Введите ваше настроение:");


askMood(mood, function(mood) {
    if (mood === "весёлое") {
        console.log("Послушай музыку или позвони другу!");
    } else if (mood === "грустное") {
        console.log("Соверши небольшую прогулку или посмотри комедию");
    } else if (mood === "подавленное") {
        console.log("Отдохни! Можно просто поспать или принять ванну");
    } else {
        console.log("Сделай что-то приятное для себя");
    }
});