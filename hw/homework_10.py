from typing import Any

def lin_search(nums: list[Any], target: Any) -> int:
    for i in range(len(nums)):
        if nums[i] == target:
            return i
    return -1


def bubble_sort(nums: list[Any]) -> list:
    nums_copy = nums.copy()
    for i in range(len(nums_copy)-1):
        is_sorted: bool = True
        for j in range(len(nums_copy)-1-i):
            if nums_copy[j] > nums_copy[j+1]:
                nums_copy[j], nums_copy[j+1] = nums_copy[j+1], nums_copy[j]
                is_sorted = False

        if is_sorted:
            break
    return nums_copy


def bin_search(nums: list[int], target: int) -> int:
    left: int = 0
    right: int = len(nums) - 1
    while left <= right:
        mid_index: int = left + (right - left) // 2
        if nums[mid_index] == target:
            return mid_index
        elif nums[mid_index] > target:
            right = mid_index - 1
        else:
            left = mid_index + 1

    return -1


def get_min(nums: list[Any]) -> int:
    return min(nums)


def get_max(nums: list[Any]) -> int:
    return max(nums)


def get_avg(nums: list[Any]) -> float:
    return sum(nums) / len(nums)


def get_median(nums: list[Any]) -> float:
    sorted_nums = bubble_sort(nums)
    n = len(sorted_nums)
    mid = n // 2
    if n % 2 == 0:
        return (sorted_nums[mid - 1] + sorted_nums[mid]) / 2
    else:
        return sorted_nums[mid]
    

def menu() -> None:
    print("Выберете действия:")
    print("1. Найти число(линейный поиск)")
    print("2. Найти число(бинарный поиск)")
    print("3. Отсортировать список пузырьком")
    print("4. Найти минимальное значение")
    print("5. Найти максимальное значение")
    print("6. Найти среднее значение")
    print("7. Найти медианное значение")
    print("8. Выход")
    


if __name__ == "__main__":
    user_nums: list[int | float] = [float(num) for num in input("Введите список чисел:").split()]
    while True:
        menu()
        user_input: str = input("Выбери пункт меню: ")
        if user_input == "1":
            target: Any = float(input("Введите чиcло для поиска: "))
            result = lin_search(user_nums, target)
            print(f"Результат линейного поиска: {result}")
        elif user_input == "2":
            target: Any = float(input("Введите чило для поиска: "))
            sorted_nums = bubble_sort(user_nums)
            result = bin_search(sorted_nums, target)
            print(f"Результат бинарного поиска: {result}")
        elif user_input == "3":
            sorted_nums = bubble_sort(user_nums)
            print(f"Отсортированный список: {sorted_nums}")
        elif user_input == "4":
            result = get_min(user_nums)
            print(f"Минимальное значение: {result}")
        elif user_input == "5":
            result = get_max(user_nums)
            print(f"Максимальное значение: {result}")
        elif user_input == "6":
            result = get_avg(user_nums)
            print(f"Среднее значение: {result}")
        elif user_input == "7":
            result = get_median(user_nums)
            print(f"Медианное значение: {result}")
        elif user_input == "8":
            break
        else:
            print("Пожалуйста, выберите пункт из меню.") 
            