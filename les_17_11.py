# def show_params(*args, **kwargs) -> None:
#     print(args)
#     print(kwargs)

#     print("Positional:", *args)
#     print("Key-args:", end=" ")
#     for key, val in kwargs.iems():
#         print(f"{key} - {val}", end=" ")
#     print()    


# nums: list[int] = [1, 2, 3, 4, 56, 112]

# data: dict[str, str] = {
#     "sep": "-",
#     "end": "!",
# }

# print(*nums, **data)

# show_params("Hi", 1, 3.14, True, age= "18", name="Anna")






# # task 1

# def create_profile(name: str, age: int, city: str, **kwargs) -> None:
#     print(f"Имя: {name}")
#     print(f"Возраст: {age}")
#     print(f"Город: {city}")
#     for key, val in kwargs.items():
#         print(f"{key}: {val}")

# create_profile("Anna", 18, city="Moscow", hobby="drawing", date_birth="2006-03-24")


# # task 2
# def summator(*args, show_steps: bool = False) -> None:
#     if show_steps:
#         steps = "+".join(str(i) for i in args)
#         print(f"{steps}={sum(args)}")
#     else:
#         print(sum(args))



# summator(1, 2, 3, 4, show_steps=True)
# summator(1, 2, 3, 4, show_steps=False)
# summator(1, 2, 3, 4)

# task 3 
def convert_to_python_case(text: int) -> None:
    result = " "
    for i, char in enumerate(text):
        if char.isupper():
            if i != 0:
                result += "_"
            result += char.lower()
        else:
            result += char
    return result
print(convert_to_python_case("ThisIsCamelCased"))


# task 4

