# Переменные и типы данных
my_name: str = "Nastya"
num: int = 112
pi: float = 3.14
flag: bool = True


#Условия
if num % 2 ==0:
    print("Hello")
elif num < 100:
    print("YES")
else:
    print("GOODBYE")


#And/Or
print(1 and 0)
print(1 or 0)
print(True==1)


#Ввод/вывод данных
age: int = int(input("help text"))
print(age, 1, "hello", sep="*", end="\t")
print("hello")

#Коллекции
nums: list[int | float | str] = [1, 2, 3, 4, 5, "hello", 3.14]
names: tuple[str] = {"alina", "ivan", "kirill"}
unique_nums: set[int] = (2, 3, 4, 5)


print(nums[3])
nums.append(100)
nums.sort()
nums.pop()


#Split()/join()
stroka: list[str] = "hello, my friend. Im glad to see you"
sentence: list[str] = "hello, my friend. Im glad to see you".split(" ")
sentences: str = "*".join(sentence)

print(sentences)
print(sentence)


# lists
for el in sentence:
    print(el)

for i in range(len(sentence)):
    print(sentence[i])


i: int = 0
while i < len(sentence):
    print(sentence[i])
    i += 1



# 2d list

two_d_nums: list[list[int]] = [
    [1, 2, 3],
    [4, 5, 6],
    [21, 32, 58]
]

for row in two_d_nums:
    for num in row:
        print(num, end=' ')
    print()

for row in two_d_nums:
    for el in row:
        print(el)
print()

for i in range(len(two_d_nums)):
    for j in range(len(two_d_nums[i])):
        print(two_d_nums[i][j])



i: int = 0

while i < len(two_d_nums):
    j: int = 0
    while j < len(two_d_nums[i]):
        print(two_d_nums[i][j])
        j += 1
    i += 1



# Task1.1
user_input: list[str] = [int(el) for el in input().split()]

# for i in range(len(user_input)):
#     user_input[i] = int(user_input[i])

# for num in user_input:
#     for i in range(num):
#         print("+", end=" ")
#     print()


# Task1.2
user_input: list[str] = [int(el) for el in input().split()]

for num in user_input:
    print("+"*num)



##Task2
ip_nums: list[str] = [int(el) for el in input().split(".")]
ip_flat: bool = True

if len(ip_nums) != 4:
    ip_flat = False
else:
    for el in ip_nums:
        if el < 0 or el > 255:
            ip_flat = False
            break

if ip_flat == True:
    print("YES")
else:
    print("NO")
