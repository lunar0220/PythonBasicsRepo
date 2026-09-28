from fastapi import FastAPI, HTTPException
import wallets_repository
from db import Base, engine

# app = FastAPI()
# WALLETS = {}


# @app.get("/wallet")
# def get_wallet(name: str):
#     with open("db.txt", "r", encoding="utf-8") as db:
#         for line in db: 
#             if name in line:
#                 return {"message": f"Get wallet with name {name} with balance {WALLETS[name]}"}
#     return HTTPException(status_code=400, detail={"Wallet with nwme {name} does not exist"})
 
    
# @app.post ("/wallet")
# def add_wallet(name: str, balance: float):
#     with open('db. txt', 'a', encoding='utf-8') as db:
#         db. write(f' (name): (balance)\n')
#     return {"message": f"wallet (name) added"}

# @app.post ("/income")
# def add_income (name: str, balance: float):
#     if balance < 0:
#         return HTTPException(status_code=400, detail=f"income must be greater than 0")
#     if name not in WALLETS:
#         return HTTPException(status_code=400, detail=f"Wallet with name {name} does not exist")
#     WALLETS [ name ] += balance
#     return {"message": f"balabnce of (name) increased by {balance}! Now total {WALLETS [name]}"}

# @app.post("/income")
# def add_expense(name: str, balance: float):
#     if balance < 0:
#         return HTTPException (status_code=400, detail=f"Expense must be greater than 0")
#     if name not in WALLETS:
#         return HTTPException (status_code=400, detail=f"Wallet with name {name} does not exist")
#     WALLETS [name] -= balance
#     return {"message": f"balance of {name} decreased by {balance}! Now total {WALLETS [name]}"}



app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get ("/wallet")
def get_wallet_by_name (name: str):
    if not wallets_repository. is_wallet_exists(name) :
        return HTTPException (status_code=400, detail="Wallet doesn't exist")
    wallet_balance = wallets_repository.get_wallet_by_name(name)
    return {"wallet_name": name, "balance": wallet_balance}

@app.post ("/wallet")
def add_wallet(name: str, balance: float) :
    if wallets_repository.is_wallet_exists(name) :
        return HTTPException(status_code=400, detail="Wallet already exist")
    wallet_balance = wallets_repository.create_wallet(name,balance)
    return {"wallet_name": name, "balance": wallet_balance, "message": "Wallet created!"}

@app. post("/income")
def add_income (name: str, balance: float):
    pass

@app.post("/income")
def add_expense (name: str, balance: float):
    pass
