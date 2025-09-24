from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str
    date: str  # YYYY-MM-DD

class ExpenseOut(BaseModel):
    id: str
    title: str
    amount: float
    category: str
    date: str


class ExpenseUpdate(BaseModel):
    title: str
    amount: float
    category: str
    date: str
