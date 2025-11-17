from typing import Any

population: dict [str, Any] = {
    "Moscow": 14_000_000,
    "Saint-petersburg": 9_000_000,
    "Kazan": 1_300_000,
    "Zimbabve": "empty",
}

print(population["Kazan"])
p_pop: Any = print(population.get("Paris"))
if p_pop:
    print(".....")
else: 
    print(population.get("Moscow"))


print(population.keys())
print(population.values())
print(population.items())




for key, val in population.items():
    print(key, val)


print(population.pop("Zimbabve"))
print(population)

population_2 = {
    "Kazan": "fgiornf",
    "Paris": "10_000_000"
}

population.update(population_2)

print(population)


def say_hello(name: str) -> None:
    print('Hello', name) 
def my_max(a: int, b: int) -> int:
    if a > b:
        return a
    return b


x: int = 10

def func() -> None:
    global x
    x += 5
    print(x)

func()
print(x)




# task1
words: list[str] = input().split()
wors_count: dict[str, int] = {}

for el in words:
    wors_count[el] = 0

for el in words:
    wors_count[el] += 1

print(wors_count)


words: list[str] = input().split()
wors_count: dict[str, int] = {el: 0 for el in words}

for el in words:
    wors_count[el] += 1

print(wors_count)

# task2
store = {
    "хлеб": 60,
    "молоко": 80,
    "сыр": 150
}

u_i = input("Введите товар:")
if u_i in store:
    print(store[u_i])
else:
    print("Sorry")

# task3
def average(grades):
    return sum(grades) / len(grades) if grades else 0 

students = {
    "Анна": [5, 4, 5, 5],
    "Борис": [3, 4, 4, 5]
}

for student, grades in students.items():
    print(f"{student} -> {average(grades)}")


# var kirill
def average(grades: list[int]) -> float:
    return sum(grades) / len(grades)

students = {
    "Анна": [5, 4, 5, 5],
    "Борис": [3, 4, 4, 5]
}

for key, val in students.items():
    print(key, "->", average(grades))



