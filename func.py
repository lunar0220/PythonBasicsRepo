expenses: dict[str, list[float | int]] = {}
def show_menu() -> None:
    print("Выберете действия:")
    print("1. Добавить расход")
    print("2. Посмотреть рассходы")
    print("3. Посмотреть рассхлоды по категории")
    print("4. Удалить рассходы")
    print("5. Выйти")


def add_expense(expenses: dict) -> None:
    category: str = input("Введите ктегории: ")
    expense: list[int] = [float(num) for num in input().split()]

    if expense[category]:
        expenses[category] = expense
    else:
        for ex in expense:
            expenses[category].append(ex)


def show_expenses(expenses: dict) -> None:
    for key, val in expenses.items():
        print(f"{key} - {sum(val)}")


def show_expenses_by_category(expenses: dict, category: str) -> None:
    print(f"{category} - {expenses.get(category, 0)}")


def delete_expenses(expenses: dict, category: str) -> None:
    if expenses.get(category):
        del expenses[category]
    else:
        print("Такой категории нет")
