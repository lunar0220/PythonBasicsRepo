import math
from random import randint
import datetime as dt

print(math.cos(45)) 
print(randint(1, 28))
print(dt.date.today())


import math


def greet(name: str) -> str:
    return f"Hello, {name}"


def greet(name: str) -> str:
    return f"Ni Hao, {name}"


def sum(num_1: int | float, num_2: int | float) -> int | float:
    return num_1+num_2


def multi(num_1: int | float, num_2: int | float) -> int | float:
    return num_1*num_2


def main():
    print(greet("Anna"))
    print(sum(3.14, 5.6))
    print(multi(1, 5))
