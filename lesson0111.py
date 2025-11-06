# # задание 3 

# letter:str = input()
# sep: str = input()
# print(sep.join(letter))


# print(input().join(input()))

# # задание 4

# nums_list: list[int] = [int(num) for num in input().split()]
# nums_list.sort()
# print(nums_list)

# nums_list.sort(reverse=True)
# print(nums_list)



# nums_list: list[int] = [int(num) for num in input().split()]
# sorted(nums_list) #функция сортирует список и создает новый
# print(nums_list)

# sorted(nums_list, reverse=True)
# print(nums_list)


# nums_list: list[int] = [int(num) for num in input().split()]

# print(sorted(nums_list), sorted(nums_list, reverse=True), sep='\n')


# # задание 5
# sent: list[int] = (len(word) for word in input().split())
# print(max(sent))

# print(max(len(word) for word in input().split()))


# задание 7 
n_list = [int(x) for x in input().split()]
count = 0 

for i in range(len(n_list)):
    for j in range(i + 1, len(n_list)):
        if n_list[i] == n_list[j]:
            count += 1
print(count)



#  задание 8
import random 
n = int(input("Введите кол-во строк:"))
m = int(input("Введите кол-во столбцов:"))

matrix = [[random.randint(1, 100) for i in range(m)] for i in range(n)]
print("\nМатрица")
for row in matrix:
    print(row)

avg = [sum(row)/len(row) for row in matrix]

print("\nСредние занчение по строкам:")
for i, avg in enumerate(avg, 1):
    print(f"Строка {i}: {avg: 2f}")
