from fastapi import Depends, FastAPI, HTTPException

from auth import (
    create_access_token,
    get_current_account,
    hash_password,
    require_admin,
)
from models import Account, LoginRequest, RegisterRequest
from storage import accounts, find_account

app = FastAPI(title="HW Auth")


@app.post("/register", status_code=201)
def register(data: RegisterRequest):
    if find_account(data.username):
        raise HTTPException(status_code=400, detail="Пользователь уже существует")

    account = Account(
        username=data.username,
        password=hash_password(data.password),
        role=data.role,
        email=data.email,
    )
    accounts.append(account)
    return {"message": "Аккаунт создан", "username": account.username}


@app.post("/login")
def login(data: LoginRequest):
    account = find_account(data.username)
    if account is None or account.password != hash_password(data.password):
        raise HTTPException(status_code=401, detail="Неверный логин или пароль")

    token = create_access_token(account.username)
    return {"access_token": token, "token_type": "bearer"}


@app.get("/me")
def me(account: Account = Depends(get_current_account)):
    return account.model_dump(exclude={"password"})


@app.get("/admin/stats")
def admin_stats(admin: Account = Depends(require_admin)):
    return {
        "total_accounts": len(accounts),
        "admins": sum(1 for a in accounts if a.role == "admin"),
        "users": sum(1 for a in accounts if a.role != "admin"),
    }