def squer(x: int | float) -> int | float:
    return x ** 2

# print(squer)
# print(type(squer))


# print(print)
# print(type(print))


resolt = squer #ссылка на функцию

# анонимные функции
results: callable = lambda x, y = 10: print(x ** 2, y ** 3)  
print(list(map(squer, [2, 4, 6, 12]))) #не анонимная функция
print(list(map(lambda x: x ** 2, [2, 4, 6, 12]))) #анонимная функция


nums: list[int] = [2, 4, 6, 12]
new_nums: list[int] = list(map(lambda x: x**2, nums))

print(id(nums))
print(id(new_nums))
print(nums)
print(new_nums)





# task 1
is_even: callable = lambda x: x % 2 == 0
is_upper: callable = lambda line: str(line).isupper()
last_char: callable = lambda last: str(last).strip()
print(is_even(6))
print(is_upper("HELLO"))
print(last_char("hiii"))

# task 2


def make_transform(nums: list[int | float], funcs: callable) -> list[int]:
    return[funcs(n) for n in nums]
def double(x: int) -> int: return x * 2
def munus_one(x: int) -> int: return x - 1
result1 = make_transform([1, 2, 3], double)
result2 = make_transform([1, 2, 3], munus_one)

print(result1)
print(result2)

