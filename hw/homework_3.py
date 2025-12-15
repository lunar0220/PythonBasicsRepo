#Задача 1
m: int = int(input())
n: int = int(input())

for i in range(m, n+1):
    if i % 17 == 0 or i % 10 == 9 or (i % 3 == 0 and i % 5 == 0):
        print(i)



#Задача 2
n: int = int(input())

for i in range(n, n+1):
    if  5 <= i <= 9:
        continue
    if 17 <= i <= 37:
        continue
    if 78 <= i <= 87:
        continue

print(i)



#Задание 3
n: int = int(input())

for i in range(n):
    for j in range(3):
        print(n, end="")

print()