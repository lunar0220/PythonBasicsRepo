function askMood(mood, callback){
    callback(mood);
}

let userMood = prompt("Введите ваше настроение");

askMood(userMood, function(mood){
    if(mood === null || mood.trim() === ""){
        console.log("Ошибка: введите ваше настроение");
        return;
    }

    mood = mood.toLowerCase().trim();

    if(mood === "весёлое") {
        console.log("Послушай музыку или позвони другу!");
    } else if (mood === "грустное") {
        console.log("Соверши небольшую прогулку или посмотри комедию");
    } else if (mood === "подавленное") {
        console.log("Отдохни! Можно просто поспать или принять ванну");
    } else {
        console.log("Сделай что-то приятное для себя");
    }
});