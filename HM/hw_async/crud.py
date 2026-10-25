from models import Comment
from pwdlib import PasswordHash

comments: list[Comment] = []
users: list[dict] = []

password_hash = PasswordHash.recommended()

comment_id = 1
user_id = 1



async def create_comment(author: str, text: str) -> Comment:
    global comment_id

    comment = Comment(
        id=comment_id,
        author=author,
        text=text,
    )

    comments.append(comment)
    comment_id += 1

    return comment


async def get_comments() -> list[Comment]:
    return comments.copy()


async def get_comment(comment_id: int) -> Comment | None:
    for comment in comments:
        if comment.id == comment_id:
            return comment

    return None


async def update_comment(
    comment_id: int,
    author: str,
    text: str,
) -> Comment | None:
    for index, comment in enumerate(comments):
        if comment.id == comment_id:
            updated = Comment(
                id=comment_id,
                author=author,
                text=text,
            )
            comments[index] = updated
            return updated

    return None


async def delete_comment(comment_id: int) -> bool:
    for index, comment in enumerate(comments):
        if comment.id == comment_id:
            comments.pop(index)
            return True

    return False



async def get_user(username: str) -> dict | None:
    for user in users:
        if user["username"] == username:
            return user

    return None


async def create_user(username: str, password: str) -> dict:
    global user_id

    user = {
        "id": user_id,
        "username": username,
        "hashed_password": password_hash.hash(password),
        "role": "user",
    }

    users.append(user)
    user_id += 1

    return user


async def verify_password(
    password: str,
    hashed_password: str,
) -> bool:
    return password_hash.verify(password, hashed_password)