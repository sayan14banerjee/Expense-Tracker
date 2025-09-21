# app/functions/user/login_logout.py
from fastapi import HTTPException, status
from app.database import db
from app.utils.auth import hash_password, verify_password, create_access_token
from app.schemas import UserOut
from bson import ObjectId

# --- SIGNUP LOGIC ---
async def signup(user):
    # Check if user already exists
    existing = await db.users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash password before storing
    hashed_pwd = hash_password(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_pwd

    # Insert into MongoDB
    result = await db.users.insert_one(user_dict)

    return UserOut(id=str(result.inserted_id), name=user.name, email=user.email)

# --- LOGIN LOGIC ---
async def login(user):
    # Check if user exists
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Create JWT token
    token = create_access_token({"sub": str(db_user["_id"])})
    return {"access_token": token, "token_type": "bearer"}
