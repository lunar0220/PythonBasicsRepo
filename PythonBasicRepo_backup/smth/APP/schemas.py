from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type :str
    
class UserCreaete(BaseModel):
    email: str
    password: str
    role: str = "user"