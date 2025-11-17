nums: list[int] = [10, 20, 30, 40, 100]
greeting: str = "Hello, its me"


nums_2: list[int] = nums[1:3]


print(greeting[0:5: ])
print(nums[::-1])

print(nums)
print(nums_2)

nums_2[0] = 300
print(nums)
print(nums_2)



from typing import Any


def linear_search(elements: list[Any], elem: Any) -> int | str:
    for i in range(len(elements)):
        if elements[i] == elem:
            return i
    return "не найдено"


if __name__ == "__main__":
    elements: list[Any] = [1, 2, 3.14, "!", True, 200]
    print(linear_search(elements, "!"))


def bin_search(elements: list[int], elem: int) -> bool:
    elements.sort()
    start: int = 0
    end: int = len(elements) - 1
    for _ in range(len(elements)):
        mid_index: int = start + (end - start) // 2
        if elements[mid_index] == elem:
            return True
        elif elements[mid_index] > elem:
            end = mid_index - 1
        else:
            start = mid_index + 1

    return False




def bubble_sort(elements: list[int | float]) -> None:
    for i in range(len(elements)-1):
        is_sorted: bool = True
        for j in range(len(elements)-1-i):
            if elements[j] >= elements[j+1]:
                elements[j], elements[j+1] = elements[j+1], elements[j]
                is_sorted = False

        if is_sorted:
            break
    
        


if __name__ == "__main__":
    elements: list[Any] = [1, 2, "!", 3.14, 10, True, 600]
    nums: list[int] = [100, 200, 1, 4, 15, 12, 17]
    print(linear_search(elements, "!"))
    print(bin_search(nums, 1))
    bubble_sort(nums)
    print(nums)



def menu() -> None:
    print("Выберете действия:")
    print("1. Найти число(линейный поиск)")
    print("2. Найти число(бинарный посик)")
    print("3. Отсортировать список пузырьком")
    print("4. Выйти")


if __name__ == "__main__":
    user_nums: list[int | float] = [float(num) for num in input("Введите список чисел:").split()]
    while True:
        menu()
        user_input: str = input("Выбери пункт меню: ")
        if user_input == "1": 
            break