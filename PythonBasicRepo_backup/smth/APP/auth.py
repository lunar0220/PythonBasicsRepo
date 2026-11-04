from datetime import datetime, timedelta
from errno import EACCES
from typing import Optional
from jose import jwt,JWTError

def create_access_token(data: dict, expires_delta: Optional[int] = None):
    to_encode = data.copy()
    
    expire = datetime.utcow() + timedelta(
        minutes=expires_delta or ACCESS_TOKEN_EXPIRE_MINUTES
    )

to_encode.update ({"exp": expire})

return jwt.encode (to_encode, SECRET_KEY, algorithm=ALGORITHM)