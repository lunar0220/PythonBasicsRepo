

students = [
    {"name": "Анна", "score": 88},
    {"name": "Павел", "score": 95},
    {"name": "Игорь", "score": 72},
    {"name": "Марина", "score": 91},
]

sorted_stud = sorted(students, key=lambda x: x["score"], reverse=True)
filtered_stud = filter(lambda x: x["score"] > 85, sorted_stud)
result = list(map(lambda x: x["name"].upper(), filtered_stud))

print(result)