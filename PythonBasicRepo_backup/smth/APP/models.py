from sqlalchemy import Column, String, Integer
from db import Base

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(256), unique=True, nullable=False)
    hashed_password=Column(String, nullable=False)
    role = Column(String, defalt="user")