from pydantic import BaseModel


class Comment(BaseModel):
    id: int
    author: str
    text: str
    
    
class CommentCreate(BaseModel):
    author: str
    text: str


class UserCreate(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserPublic(BaseModel):
    id: int
    username: str
    role: str