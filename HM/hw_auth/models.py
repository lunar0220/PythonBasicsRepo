from pydantic import BaseModel


class Account(BaseModel):
    username: str
    password: str
    role: str
    email: str


class RegisterRequest(BaseModel):
    username: str
    password: str
    email: str
    role: str = "user"


class LoginRequest(BaseModel):
    username: str
    password: str