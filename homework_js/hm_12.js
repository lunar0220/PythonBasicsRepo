let human = {
    lastname: 'Иванов',
    name: 'Иван',
    surname: 'Иванович',
    birthYear: '2002',
    work: [
        {
            place: 'АО «БСК»', 
            position: 'Инженер 1 категории',
            year_start: 2020, 
            year_end: 2022
        },
        {
            place: 'ООО «СтройМир»', 
            position: 'Ведущий инженер',
            year_start: 2022, 
            year_end: 2025
        },
        {
            place: "АО «ТехноГрад»",
            position: "Директор по развитию",
            year_start: 2020,
            year_end: null
        },
    ]
};

Object.defineProperty(human, "fullName", {
  value: function() {
    return `${this.lastname} ${this.name} ${this.surname}`;
  },
  writable: false,
  enumerable: true,
  configurable: false
});

Object.freeze(human);
Object.freeze(human.work);
human.work.forEach(workItem => Object.freeze(workItem));


console.log("Object.keys(human):", Object.keys(human));
console.log("Полное имя:", human.fullName());
