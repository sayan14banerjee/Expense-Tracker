# app/routers/user.py
from fastapi import APIRouter
from app.schemas import UserCreate, UserLogin, UserOut
from app.functions.user.login_logout import signup, login

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/signup", response_model=UserOut)
async def signup_route(user: UserCreate):
    return await signup(user)

@router.post("/login")
async def login_route(user: UserLogin):
    return await login(user)
