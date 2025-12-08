# Задача 5
import math

def solve(a, b, c: int) -> float:
    D = b**2 - 4*a*c
    x1 = (-b - math.sqrt(D)) / (2*a)
    x2 = (-b + math.sqrt(D)) / (2*a)
    return min(x1, x2), max(x1, x2)

print(*solve(1, -4, -5))


# Дз
from typing import Any

def make_report(title: str, **sections: int) -> None:
    print(f"=== Отчёт: {title} ===")
    total = 0
    for name, value in sections.items():
        print(f"{name}: {value}")
        total += value

    print("Итого:", total)


make_report(
    "Продажи",
    Север=12000,
    Юг=8500,
    Запад=9000
)