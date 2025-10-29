# Task #1
# m: int = int(input())
# n: int = int(input())

# for i in range(m, n+1):
#     print(i)






# # Taks #2
# m: int = int(input())
# n: int = int(input())

# for i in range(m, n-1, -1):
#     if i % 2 !=0:
#         print(i)






# Task #3
# num: str = input()

# for i in range(1, len(num)+1):
#     print(num[-i], end="")


# num: str = input()

# for i in range(len(num)-1, -1, -1):
#     print(num[-i], end="")

# num: int = int(input())

# while num != 0:
#     print(num % 10, end="")
#     num //= 10









# TASK1
# a: int = int(input("Ведите число a:"))
# b: int = int(input("Введите число б:"))

# if a > b:
#     print("a больше б")
# elif a < b:
#     print("а меньше б")
# else:
#     print("a равно б")




# TASK2
# nums: str = input()
# nums_list = nums.split(",")
# print(nums_list)

# nums_list: list[str] = input().split()
# odd_sum: int = 0
# even_sum: int = 0

# # var1
# # for num in nums_list:
# #     if int(num) % 2 == 0:
# #         odd_sum += int(num)
# #     else:
# #         even_sum += int(num)
# # print("Odd:", odd_sum)
# # print("Even:", even_sum)

# # var2
# for i in range(len(num_list)):
#     if int(nums_list[i]) % 2 == 0:
#         odd_sum += int(nums_list[i])
#     else:
#         even_sum += int(nums_list[i])
# print("Odd:", odd_sum)
# print("Even:", even_sum)


#TASK3
# nums: list[int] = [5, 3, 8, 6, 2, 8, 3]

# nums.sort()
# nums = set(nums)
# nums = list(nums)
# print(nums[-2])




# TASK4
# num: int = int(input())
# nums: list[int] = []

# for i in range(1, num+1):
#     nums.append(i)

# index: int = 0
# while index < len(nums):
#     if nums[index] % 3 == 0 or nums[index] % 5 == 0:
#         nums.pop(i)

#     index += 1
# for num in nums:
#     print(num, end=" ")
# print(nums)


# import random

# matrix: list[list[int]] = []

# n: int = 10
# m: int = 7

# for i in range(n):
#     row: list[int] = []
#     for j in range(m):
#         row.append(random.randint(1, 100))
#     matrix.append(row)

# for row in matrix:
#     print(row)


# print()

# row_sums: list[int] = [sum(row) for row in matrix]
# print(row_sums)


# cols: int = len(matrix[0])
# cols_sums: list[int] = []

# for j in range(cols):
#     col_sum: int = 0 
#     for i in range(len(matrix)):
#         col_sum += matrix[i][j]
#     cols_sums.append(col_sum)
# print()
# print(cols_sums)



# #task1


# matrix: list[list[int]] = []

# for i in range(5):
#     row: list[int] = []
#     for j in range(5):
#         row.append(j*5+j+1)
#     matrix.append(row)

# for row in matrix:
#     print(row)


# diag_sum: int = 0

# for i in range(len(matrix)):
#     diag_sum += matrix[i][i]

# print(diag_sum)


# diag_sum_list: int = sum([matrix[i][i] for i in range(len(matrix))])
# print(diag_sum_list)

# print()



# #Ручной максимум
# max_el: int = matrix[0][0]
# index: list[int] = [0,0]

# for i, row in enumerate(matrix):
#     for j, item in enumerate(row):
#         if item > max_el:
#             max_el = item
#             index[0] = i
#             index[1] = j
# print(max_el, index)


# #Func max

# max_el: int = matrix[0][0]

# for row in matrix:
#     max_in_row: int = max(row)
#     if max_in_row > max_el:
#         max_el = max_in_row

# print(max_el)





#hard task

matrix1: list[list[int]] = [
    [1, 2, 3],
    [4, 5, 6]
]
matrix2: list[list[int]] = [
    [8, 9, 10],
    [11, 12, 13]
]

matrix3: list[list[int]] = []

for i in range(len(matrix1)):
    row: list[int] = []
    for j in range(len(matrix1[i])):
        row.append(matrix1[i][j] + matrix2[i][j])
    matrix3.append(row)

for row in matrix3:
    print(row)