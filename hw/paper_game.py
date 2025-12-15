# p_c: int = (input("Камень, ножницы или бумага? "))
# c_c = "Камень"


# if p_c == c_c:
#     print("Ничья!")
# elif (p_c == "Камень" and c_c == "Ножницы") or (p_c == "Ножницы" and c_c == "Бумага") or (p_c == "Бумага" and c_c == "Камень"):
#     print("Вы выиграли!")
# else:
#     print("Вы проиграли!")


#разбор кирилла


import random 
figurs: list[str] = ["Камень", "Ножницы", "Бумага"]


while True:
    p_c: str = (input("Камень, ножницы или бумага? "))
    c_c: str = random.choice(figurs)

    print("ВЫбор комапа:", c_c)

    if (p_c == "Камень" and c_c == "Ножницы") \
        or (p_c == "Ножницы" and c_c == "Бумага") \
        or (p_c == "Бумага" and c_c == "Камень") :
        print("WIN!")
    elif p_c == c_c:
        print("TIE!!!")
    if p_c not in figurs:
        print("Figure missmatch!!")
    else:
        print("LOOSE!")
    user_break: str = input ("Do you wanna continue? (y/n): ")

    if user_break == "n":
        break
    elif user_break not in ["y", "n"]:
        print("I dont understand")