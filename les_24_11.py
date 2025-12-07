# #task 1
# def task_1() -> None: 
#     nums: list[int|float] = [float(x) for x in input().split()]

#     print("Максимльное: ", max(nums))
#     print("Минимальное: ", min(nums))
#     print("Среднее: ", sum(nums)/len(nums))
#     print("Положительное: ", list(filter(lambda x: x >= 0, nums)))
#     print("Сглаженный:", [nums[i]=nums[i-1]for i in range(1, len(nums))])

# task_1()




# # task2
# def bubble_sort(students: list[dict[str, str | int]]) -> None:
#     for i in range(len(students)):
#         is_sorted: bool = True
#         for j in range(len(students)-1-i):
#             if students[j]["score"] < students[j+1]["score"]:
#                 students[j], students[j+1] = students[j+1], students[j]
#                 is_sorted = False

#         if is_sorted:
#             break



# def task_2(students: list[dict[str, str | int]]) -> list[str]:
#     bubble_sort(students)
#     filtered_students = list(filter(lambda x: int(x["score"]) >= 80, students))

#     return [x["name"].upper() for x in filtered_students]
    


# students: list[dict[str, str | int]] = [
#     {"name": "Анна", "score": "91"},
#     {"name": "Павел", "score": "75"},
#     {"name": "Игорь", "score": "82"},
# ]

# print(task_2(students))



# task 3
def hello_world(string: str) -> None:
    vowels: str = "aeiyuo"
    print("Гласные:", len(list(filter(lambda x: x in vowels or x in vowels.upper(), string))))
    print("Согласные:", len(list(filter(lambda x: x not in vowels or x not in vowels.upper(), string))))
    print(string[::-1])
    print(string.replace(" ", ""))

sentens: str = "Hello World"
hello_world(sentens)


# # task 4
# def make_operator(operator: str) -> callable:
#     if operator == "*":
#         return lambda x, y: x*y
#     elif operator == "+":
#         return lambda x, y: x + y
#     elif operator == "max":
#         return lambda x, y: x if x > y else y

# op: callable = make_operator("max")
# print(op(2, 4))


# # task 5
# def move_robot(commands: list[str]) -> tuple[int]:
#     coords: tuple[int] = (0, 0)


#     cm_ds: dict[str, callable] = {
#         "up": lambda x, y: (x, y+1), 
#         "down": lambda x, y: (x, y-1),
#         "left": lambda x, y: (x-1, y+1), 
#         "right": lambda x, y: (x+1, y)
#     }

#     for cmd in commands:
#         coords = cm_ds[cmd](coords[0], coords[1])

#     return coords

# alala = ["up", "down", "left", 'right']
# print(move_robot(alala))



# task 6 
# from typing import Iterable

# def bubble_sort(iterable: Iterable[int], comp: callable[[float, float], bool]) -> None:

#     for i in range(len(iterable)):
#             list_sorted: bool = True

#             for j in range(len(iterable)-1-i):
#                 if comp(iterable[j], iterable[j+1]):
#                     iterable[j], iterable[j+1] = iterable[j+1], iterable[j]
#                     list_sorted = False

#             if list_sorted:
#                 break


# nums = [5, 2, 14, 1, 22, 13]
# comp = lambda x, y: x > y
# bubble_sort(nums, comp)
# print(nums)



# task 7 
def line_serch(line: list[int | float]) -> None:
    pass