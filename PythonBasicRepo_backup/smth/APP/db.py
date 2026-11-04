from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base 
import os
from dotent import load_dotenv


load_dotenv()


# загрузить . env при старте
DATABASE_URL = os. geten ("DATABASE_URL", "sqlite+aiosqlite:///./test.db")

engine = create_async_engine(DATABASE_URL, echo=False, future=True)
AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

Base = declarative_base()

# Для удобства: зависимость (async) для получения сессии
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session