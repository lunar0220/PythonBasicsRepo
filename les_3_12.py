# try:
#     num: int = int(input())
#     num_2: int = int(input())

#     print(num / num_2)


# except Exception as e:
#     print(f"Ошибка: {e}")

# finally:
#     print("Успех")


# raise #вызывть/поднять ошибку




# import csv

# with open('data.csv', 'r', encoding='utf-8') as file:
#     reader = csv.reader()
#     content = list(reader)


# with open('output.csv', 'x', encoding='utf-8') as file:
#     writer = csv.writer(file)
#     writer.writerow(content)


# import json


# with open('example.json', 'r', encoding='utf-8') as file:
#     data = json.load(file)

# print(data)