from datetime import date

def calculate_day_till_bd(month, day):
    today = date.today()
    birth_date = date(today.year, month, day)


    if birth_date < today:
        birth_date = date(today.year + 1, month, day)
    return (birth_date - today).days

print('Сколько дней до моего дня рождения')

day = int(input("Введите день рождения: "))
month = int(input("Введите месяца рождения(1-12): "))


days = calculate_day_till_bd(month, day)
print(f"До вашего дня рождения осталось {days} дней!")