from datetime import datetime, timedelta, timezone


import jwt
from jwt.exceptions import InvalidTokenError

from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from models import Comment, CommentCreate, UserCreate, UserLogin, UserPublic
from crud import (
    comments,
    users,
    create_comment,
    get_comments,
    get_comment,
    update_comment,
    delete_comment,
    get_user,
    create_user,
    verify_password,
)

app = FastAPI(title="Async Homework API")

SECRET_KEY = "replace-this-with-a-long-random-secret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

security = HTTPBearer()




def create_access_token(user: dict) -> str:
    expires = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": str(user["id"]),
        "username": user["username"],
        "role": user["role"],
        "exp": expires,
    }

    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )
        user_id = int(payload["sub"])
    except (InvalidTokenError, KeyError, TypeError, ValueError):
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = next(
        (u for u in users if u["id"] == user_id),
        None,
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )

    return user


async def require_admin(
    current_user: dict = Depends(get_current_user),
) -> dict:
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin access required",
        )

    return current_user




@app.post("/register", response_model=UserPublic, status_code=201)
async def register(data: UserCreate):
    existing_user = await get_user(data.username)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists",
        )

    user = await create_user(data.username, data.password)

    return UserPublic(
        id=user["id"],
        username=user["username"],
        role=user["role"],
    )




@app.post("/login")
async def login(data: UserLogin):
    user = await get_user(data.username)

    if user is None or not await verify_password(
        data.password,
        user["hashed_password"],
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
        )

    token = create_access_token(user)

    return {
        "access_token": token,
        "token_type": "bearer",
    }




@app.get("/me", response_model=UserPublic)
async def read_me(
    current_user: dict = Depends(get_current_user),
):
    return UserPublic(
        id=current_user["id"],
        username=current_user["username"],
        role=current_user["role"],
    )




@app.get("/admin/stats")
async def admin_stats(
    current_user: dict = Depends(require_admin),
):
    return {
        "total_users": len(users),
        "total_comments": len(comments),
    }




@app.post("/comments", response_model=Comment, status_code=201)
async def add_comment(data: CommentCreate):
    return await create_comment(data.author, data.text)


@app.get("/comments", response_model=list[Comment])
async def list_comments():
    return await get_comments()


@app.get("/comments/{comment_id}", response_model=Comment)
async def read_comment(comment_id: int):
    comment = await get_comment(comment_id)

    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")

    return comment


@app.put("/comments/{comment_id}", response_model=Comment)
async def edit_comment(comment_id: int, data: Comment):
    comment = await update_comment(
        comment_id,
        data.author,
        data.text,
    )

    if comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")

    return comment


@app.delete("/comments/{comment_id}")
async def remove_comment(comment_id: int):
    deleted = await delete_comment(comment_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Comment not found")

    return {"message": "Comment deleted"}