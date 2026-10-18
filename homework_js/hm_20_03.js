function formatPhoneNumber(phone) {
    if (phone.startsWith("8")) {
        phone = "+7" + phone.slice(1);
    } else if (!phone.startsWith("+7")) {
        return "Ошибка: неверный формат номера телефона.";
    }

    if (phone.length !== 12) {
        return "Ошибка: неверный формат номера телефона.";
    }

    return `${phone.slice(0, 2)} ${phone.slice(2, 5)} ${phone.slice(5, 8)} ${phone.slice(8)}`;
}

const phone1 = "89161234567";
console.log(formatPhoneNumber(phone1)); 

const phone2 = "+79161234567";
console.log(formatPhoneNumber(phone2)); 

const phone3 = "1234567890";
console.log(formatPhoneNumber(phone3)); 