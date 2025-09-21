from app.database import db
from app.schemas import ExpenseOut
from bson import ObjectId
async def get_expense_by_id():
    pass
async def get_all_expenses(user_id: str):
    """
    Fetch all expenses for a specific user
    """
    expenses = []
    cursor = db.expenses.find({"user_id": ObjectId(user_id)})
    async for doc in cursor:
        expenses.append(ExpenseOut(
            id=str(doc["_id"]),
            title=doc["title"],
            amount=doc["amount"],
            category=doc["category"],
            date=doc["date"]
        ))
    return expenses
async def get_expenses_by_category():
    pass
async def get_expenses_by_date(user_id: str, date: str):
    """
    Fetch all expenses for a user on a specific date (YYYY-MM-DD)
    """
    expenses = []
    cursor = db.expenses.find({"user_id": ObjectId(user_id), "date": date})
    async for doc in cursor:
        expenses.append(ExpenseOut(
            id=str(doc["_id"]),
            title=doc["title"],
            amount=doc["amount"],
            category=doc["category"],
            date=doc["date"]
        ))
    return expenses
async def get_expenses_by_month():
    pass
async def get_expenses_summary_total():
    pass
async def get_expenses_summary_monthly():
    pass
