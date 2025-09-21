from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas import ExpenseCreate, ExpenseOut
from app.functions.expense.create_expense import create_expense
from app.functions.expense.get_expense import get_all_expenses, get_expenses_by_date
from app.utils.auth import get_current_user

router = APIRouter(prefix="/expenses", tags=["Expenses"])

# Create new expense
@router.post("/", response_model=ExpenseOut)
async def add_expense(expense: ExpenseCreate, current_user: dict = Depends(get_current_user)):
    return await create_expense(expense, str(current_user["_id"]))

# Get all expenses
@router.get("/", response_model=list[ExpenseOut])
async def fetch_all_expenses(current_user: dict = Depends(get_current_user)):
    return await get_all_expenses(str(current_user["_id"]))

# Get expenses by date
@router.get("/date/{date}", response_model=list[ExpenseOut])
async def fetch_expenses_by_date(date: str, current_user: dict = Depends(get_current_user)):
    return await get_expenses_by_date(str(current_user["_id"]), date)
