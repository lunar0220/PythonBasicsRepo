from decimal import Decimal

from models import Wallet
from db import SessionLocal

db = SessionLocal()

def is_wallet_exists(wallet_name: str) -> bool:
    return db.query(Wallet).filter(Wallet.name == wallet_name).first() is not None

def create_wallet(wallet_name: str, start_amount: Decimal):
    wallet = Wallet(name=wallet_name, balance=start_amount)
    db.add(wallet)
    db.commit()
    db.flush()
    return wallet.balance



def get_wallet_by_name (wallet_name: str) -> Decimal:
    wallet = db. query(Wallet).filter(Wallet.name == wallet_name).first()
    return wallet.balance

def get_all_wallets():
    db = SessionLocal()
    try: 
        wallets =db.query(Wallet).all()
        return wallets
    finally:
        db.close()
        
def delete_wallet_by_name():
    db = SessionLocal()
    try:
        Wallet
        db.delete()
    finally: 
        pass