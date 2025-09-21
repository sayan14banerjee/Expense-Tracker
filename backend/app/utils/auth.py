from bson import ObjectId
from app.database import db
from fastapi import HTTPException, status, Depends
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# ⚡ Add this line to fix the error
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = None): # type: ignore
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    if "sub" not in to_encode:
        to_encode["sub"] = str(data.get("id"))  # user ID must go in sub
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)  # type: ignore

async def get_current_user(token: str = Depends(oauth2_scheme)):  # type: ignore
    """
    Dependency to get the current logged-in user from JWT token.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        print("Received token:", token)
        print("test ====>", SECRET_KEY, ALGORITHM)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])  # type: ignore
        print("Decoded payload:", payload) 
        user_id: str = payload.get("sub")  # type: ignore
        print("user_id", user_id)
        if user_id is None:
            raise credentials_exception
    except JWTError:
        print("Error in payload")
        raise credentials_exception

    user = await db.users.find_one({"_id": ObjectId(user_id)})  # type: ignore
    print("Fetched user from DB:", user)    
    if user is None:
        raise credentials_exception

    return user
