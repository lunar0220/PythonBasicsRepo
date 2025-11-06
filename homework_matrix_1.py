n = int(input("Введите количество строк: "))
m = int(input("Введите количество столбцов: "))

matrix = []
for i in range(n):
    row = [int(x) for x in input().split()]
    matrix.append(row)

transposed = []
for i in range(m):
    new_row = []
    for j in range(n):
        new_row.append(matrix[j][i])
    transposed.append(new_row)

for row in transposed:
    print(row)