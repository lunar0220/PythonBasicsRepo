from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy import select
from schemas import Token
from sqlalchemy.ext.asyncio import AsyncSession

from APP.db import engine, Base, get_db 
from APP.models import User
from APP.schemas import UserCreate, UserOut, Token
app = FastAPI(title="My app")

@app.post("/login", response_model=Token)
async def login(from_request: UserCreate, db: AsyncSession = Depends(get_db)):
    query = select(User).where(User.email==from_request.email)
    res = await db.execute(query)
    user = res.scalar_one_or_none()
    
if not user:
    raise HTTPException(status_code=401, detail="не зареган")
if not verify_password(form_request.password, user.hashed_password): 
    raise HTTPException(status_code=401, detail="неправильный пароль")

token = create_access_token(data={"sub":user.email})
return Token(access_token=token, token_type="bearer")