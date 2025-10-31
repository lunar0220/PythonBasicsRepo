#Задача5

nums = [3, 7, 1, 9, 4]
max_number = nums[0]

for n in nums:
    if n > max_number:
        max_number = n
print("Максимальное число:", max_number)



#Задание6
nums = [ ]
for i in range(5):
    a = int(input("Введите число: "))
    nums.append(a)

total = 0

for n in nums:
    total += n

print("Сумма:", total)



#Задание7

names = ["Анна", "Борис", "Катя", "Дима"]

for name in names:
    if name.startswith ("К"):
        print(name)



#Задание8

n = int(input("Введите число:"))

for i in range(1, n+1):
    if n % 3 == 0:
        continue
    print(i)



#Задание9
n = int(input("Введите число"))
fact = 1

for i in range(1, n+1):
    fact *= i

print("Факториал:", fact)



#Задание10

data = input("Введите числа через пробел:").split()
nums = [int(x) for x in data]
avg = sum(nums) / len(nums)
result = []

for n in nums:
    if n > avg:
        result.append(n)

print("Числа больше среднего:", result)



#Задание11

words = ["apple", "banana", "cherry", "date"]
uper_words = []

for w in words: 
    uper_words.append(w.upper())

print(uper_words)



#Задание12

n = int(input("Введите число:"))

for i in range(1, n+1):
    for j in range(1, n+1):
        print(f"{i}*{j}={i*j}", end="\t")
print()



#Задание13

n = [int(x) for x in input("Введите число черези пробел:").split()]
coun = 0 

for i in range(1, len(n)):
    if n[i] > n[i-1]:
        count +=1

print("Количество элементов, больше предыдущего:", count)


#Задание14

nums = [5, 2, 3, 2, 5, 2]

while 2 in nums:
    nums.remove(2)

print(nums)



#Задание15

word = input("Введите слова через пробел:").split()
longest = word[0]

for w in word:
    if len(w) > len(longest):
        longest = w

print("Самое длинное слово:", longest)