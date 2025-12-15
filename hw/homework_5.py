a = int(input())
b = int(input())

max_sum = 0
result = a

for num in range(a, b + 1):
    current_sum = 0
    for i in range(1, num + 1):
        if num % i == 0:
            current_sum += i

    if current_sum > max_sum:
        max_sum = current_sum
        result = num
    elif current_sum == max_sum:
        if num > result:
            result = num

print(result, max_sum)