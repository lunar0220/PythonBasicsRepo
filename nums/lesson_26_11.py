# ЗАДАЧА 1 
def analiz_text_data(text: str) -> dict:
    text_lower = text.lower()
    words = text_lower.split()


    count_charms = sum(len(word) for word in words)
    longest_word = max(words, key=lambda w: len(w))
    reversed_words = [word[::-1] for word in words]


    return {
        "Количество слов": len(words),
        "Количество символов": count_charms,
        "Самое длинное слово": longest_word,
        "Перевернутые слова": reversed_words
    }


user_input = input("Введите текст: ")

stats = analiz_text_data(user_input)

print(f"Количество слов: {stats['Количество слов']}")
print(f"Количество символов: {stats['Количество символов']}")
print(f"Самое длинное слово: {stats['Самое длинное слово']}")
print(f"Перевернутые слова: {stats['Перевернутые слова']}")


# ЗАДАЧА 2
def student_list(students: list[dict[str, str | int]]) -> list[str]:
    filtered_students = list(filter(lambda x: int(x["age"]) > 18, students))
    sort_score = sorted(filtered_students, key=lambda student: student["score"], reverse=True)
    

    return [x["name"].upper() for x in sort_score]


students: list[dict[str, str | int]] = [
    {"name": "Анна", "age": 17, "score": 91},
    {"name": "Павел", "age": 19, "score": 75},
    {"name": "Игорь", "age": 20, "score": 82}
]

print(student_list(students))


# ЗАДАЧА 3


# ЗАДАЧА 4
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


if __name__ == "__main__":
    nums = [8, 3, 1, 6, 4]
    target = int(input("Введите число для поиска: "))

    linear_index = lin_search(nums, target)
    sorted_list = bubble_sort(nums)
    binary_index = bin_search(sorted_list, target)


result = {
    "linear_index": linear_index,
    "sorted_list": sorted_list,
    "binary_index": binary_index
}

print(f"linear_index: {result['linear_index']}")
print(f"sorted_list: {result['sorted_list']}")
print(f"binary_index: {result['binary_index']}")
