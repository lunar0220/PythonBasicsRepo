let libraryBook = {
    title: "Преступление и наказание",
    author: "Ф. М. Достоевский",
    genre: "Роман",
    year: 1866,
    available: true
}

libraryBook.rating = 4.8;
libraryBook.available = false;
delete libraryBook.genre;

console.log(libraryBook);