n = int(input("Введите кол-во студентов:"))
students = []

for i in range(n):
    name = input("Введите имя:")
    grades = [int(x) for x in input("Введите оценки:").split()]
    students.append([name, grades])

average_num = []

for name, grades in students:
    total = 0
    for grade in grades: 
        total += grade
    average_num.append(total / len(grades))

print("\nName       Средний балл")
for i in range(n):
    print(f"{students[i][0]:<10}{average_num[i]:.2f}")

max_average = max(average_num)
min_average = min(average_num)
best_student = students[average_num.index(max_average)][0]
worst_student = students[average_num.index(min_average)][0]
group_avg = sum(average_num) / len(average_num)

print(f"\nЛучший студент: {best_student} с средним баллом {max_average:.1f}")
print(f"\nхудший студент: {worst_student} с среднем баллом {min_average:.1f}")
print(f"\nСредний балл по группе: {group_avg:.2f}")

print("\nОтчет по студентам:")

for i in range(n):
    if average_num[i] >= 4.5:
        status = "отличник"
    elif average_num[i] >= 3.5:
        status = "хорошист"
    elif average_num[i] >= 2.5:
        status = "троечник"
    else:
        status = "неудовлетворителтьно"
    print(f"{students[i][0]}: {status}")


top_students = [students[i][0] for i in range(n) if average_num[i] >= 4.5]
print(f"\nСтуденты с средним баллом >= 4.5: {', '.join(top_students) if top_students else 'нет таких'}")