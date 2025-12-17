# Task 8
from typing import List, Tuple

def matrix_operations(matrix: List[List[int]]) -> Tuple[List[int], List[int], List[List[int]], List[List[int]]]:
    row_sum = []
    for row in matrix:
        row_sum.append(sum(row))


    col_sum = []
    for i in range(len(matrix[0])):
        s = 0
        for row in matrix:
            s += row[i]
        col_sum.append(s)


    transposed_matrix = []
    for i in range(len(matrix[0])):
        new_row = []
        for row in matrix:
            new_row.append(row[i])
        transposed_matrix.append(new_row)


    multiplied_matrix = []
    for row in matrix:
        multiplied_matrix.append(list(map(lambda x: x * 2, row)))

    return row_sum, col_sum, transposed_matrix, multiplied_matrix


matrix = [
[1, 2, 3],
[4, 5, 6]
]


row_sums, col_sums, transposed, multiplied = matrix_operations(matrix)


print("Сумма по строкам:", row_sums)
print("Сумма по столбцам:", col_sums)
print("Транспонированная матрица:", transposed)
print("Матрица, умноженная на 2:", multiplied)
