def get_total(products):
    return sum(products.values())

products = {"хлеб": 60, "молоко": 80, "сыр": 150}

print(f"Всего товаров: {len(products)}")
print(f"Общая сумма: {get_total(products)}")
