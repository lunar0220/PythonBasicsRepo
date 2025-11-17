from func import (
    show_menu,
    show_expenses,
    show_expenses_by_category,
    add_expense,
    delete_expenses
)


def main() -> None:
    print("Добро пожаловать в программу учета рассходов!")
    expenses: dict[str, list[float | int]] = {}
    while True:
        show_menu()
        user_input: int = int(input("Выберете вариант: "))
        if user_input == 1:
            add_expense(expenses)
        elif user_input == 2:
            show_expenses(expenses)
        elif user_input == 3:
            category: str = input("Введите категории: ")
            show_expenses_by_category(expenses, category)
        elif user_input == 4:
            category: str = input("Введите категории: ")
            delete_expenses(expenses, category)
        elif user_input == 5:
            break
        else:
            print("Не понтяно!")

if __name__ == "__main__":
    main()


main()