from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.db import engine, Base, get_db
from app.models import User
from app.schemas import UserCreate, UserOut, Token
from app.auth import hash_password, verify_password, create_access_token

app = FastAPI(title="FastAPI JWT Auth Example")


# ---------------------------------------------------------
# Создать таблицы при запуске (для SQLite)
# ---------------------------------------------------------
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


# ---------------------------------------------------------
# Регистрация
# ---------------------------------------------------------
@app.post("/register", response_model=UserOut)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    query = select(User).where(User.email == user_in.email)
    result = await db.execute(query)
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        email=user_in.email,
        hashed_password=hash_password(user_in.password),
        role=user_in.role
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    return user


# ---------------------------------------------------------
# Логин
# ---------------------------------------------------------
@app.post("/login", response_model=Token)
async def login(form: UserCreate, db: AsyncSession = Depends(get_db)):
    query = select(User).where(User.email == form.email)
    result = await db.execute(query)
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data={"sub": user.email})

    return {"access_token": token, "token_type": "bearer"}


# ---------------------------------------------------------
# Защищённый маршрут
# ---------------------------------------------------------
from app.auth import get_current_user

@app.get("/me", response_model=UserOut)
async def read_me(user=Depends(get_current_user)):
    return user
