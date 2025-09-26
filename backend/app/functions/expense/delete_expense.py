from bson import ObjectId
from fastapi import HTTPException
from app.schemas import ExpenseOut
from app.database import db

async def delete_expense(id: str, current_user: str):
    """
    Update an existing expense for the logged-in user
    """
    expense_id = ObjectId(id)
    user_obj_id = ObjectId(current_user)

    # Check if the expense exists
    exists_expense = db.expenses.find({"user_id": user_obj_id})
    if not exists_expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    # Delete the expense in DB
    result = await db.expenses.delete_one({"_id": expense_id, "user_id": user_obj_id})

    expenses = []

    async for doc in exists_expense:
        expenses.append(ExpenseOut(
            id=str(doc["_id"]),
            title=doc["title"],
            amount=doc["amount"],
            category=doc["category"],
            date=doc["date"]
        ))
    return expenses
    