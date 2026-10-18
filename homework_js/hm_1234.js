//задача 1

class Marker {
    constructor(color, ink) {
        this.color = color;
        this.ink = ink;
    }

    print(text) {
        let result = '';
        let remainingInk = this.ink;

        for (const char of text) {
            if (char !== ' ') {
                if (remainingInk < 0.5) {
                    break;
                }
                remainingInk -= 0.5;
            }
            result += char;
        }
        this.ink = remainingInk;

        const colors = {
            red: '\x1b[31m',
            green: '\x1b[32m',
            blue: '\x1b[34m',
            yellow: '\x1b[33m',
            reset: '\x1b[0m'
        };

        const colorCode = colors[this.color] || colors.reset;

        console.log(colorCode + result + colors.reset);
        console.log(`Осталось чернил: ${this.ink}%`);
    }
}


class RefillableMarker extends Marker {
    refill() {
        this.ink = 100;
        console.log('Маркер заправлен. Чернил: 100%');
    }
}


const marker = new Marker('blue', 5);

console.log('Простой маркер:');
marker.print('Hello World!');

console.log('\nЗаправляющийся маркер:');

const refillableMarker = new RefillableMarker('red', 5);
refillableMarker.print('Hello World!');

console.log('\nЗаправляем маркер:');
refillableMarker.refill();

console.log('\nПечатаем снова:');
refillableMarker.print('Hello World!');






//задача 2
class ExtendedDate extends Date {
    getTextDate() {
        const months = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря'
        ];
        return `${this.getDate()} ${months[this.getMonth()]} ${this.getFullYear()} года`;
    }


    isFutureOrCurrent() {
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const date = new Date(this);
        date.setHours(0, 0, 0, 0);

        return date >= today;
    }


    isLeapYear() {
        const year = this.getFullYear();

        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }


    getNextDate() {
        const nextDate = new ExtendedDate(this);
        nextDate.setDate(nextDate.getDate() + 1);

        return nextDate;
    }
}


const date = new ExtendedDate(2026, 7, 24);

console.log('Дата:', date.getTextDate());
console.log('Будущая или текущая:', date.isFutureOrCurrent());
console.log('Високосный год:', date.isLeapYear());
console.log('Следующая дата:', date.getNextDate().getTextDate());






//задача 3
class Employee {
    constructor(id, name, position, salary) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.salary = salary;
    }
}


class EmpTable {
    constructor(employees) {
        this.employees = employees;
    }

    getHtml() {
        let html = `
            <table border="1" cellpadding="8" cellspacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Должность</th>
                        <th>Зарплата</th>
                    </tr>
                </thead>
                <tbody>
        `;

        this.employees.forEach(employee => {
            html += `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.position}</td>
                    <td>${employee.salary} $</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;

        return html;
    }
}

const employees = [
    new Employee(1, 'Иван Иванович', 'Менеджер', 2200),
    new Employee(2, 'Анна Павловна', 'Бухгалтер', 2000),
    new Employee(3, 'Ксения Федорова', 'Кассир', 1700),
    new Employee(4, 'Мария Александрова', 'Администратор', 2100)
];

const empTable = new EmpTable(employees);
const html = empTable.getHtml();
console.log(html);

console.log(empTable.getHtml());






//задача 4
class StyledEmpTable extends EmpTable {

    getStyles() {
        return `
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }

                th, td {
                    border: 1px solid black;
                    padding: 8px;
                }

                th {
                    background-color: #f2f2f2;
                }
            </style>
        `;
    }

    getHtml() {
        return this.getStyles() + super.getHtml();
    }
}


const styledEmpTable = new StyledEmpTable(employees);
const styledHtml = styledEmpTable.getHtml();
console.log(styledHtml);
