from fastapi import HTTPException
from app.database import db
from app.schemas import ExpenseCreate, ExpenseOut
from bson import ObjectId

async def create_expense(expense: ExpenseCreate, user_id: str):
    """
    Create a new expense for the logged-in user
    """
    expense_dict = expense.dict()
    expense_dict["user_id"] = ObjectId(user_id)
    print("body", expense_dict)
    result = await db.expenses.insert_one(expense_dict)
    
    return ExpenseOut(
        id=str(result.inserted_id),
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        date=expense.date,
    )
