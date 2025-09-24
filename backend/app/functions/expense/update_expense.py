from bson import ObjectId
from fastapi import HTTPException
from app.schemas import ExpenseOut, ExpenseUpdate
from app.database import db

async def update_expense(id: str, expense: ExpenseUpdate, current_user: str):
    """
    Update an existing expense for the logged-in user
    """
    expense_id = ObjectId(id)
    user_obj_id = ObjectId(current_user)

    # Check if the expense exists
    exist = await db.expenses.find_one({"_id": expense_id, "user_id": user_obj_id})
    if not exist:
        raise HTTPException(status_code=404, detail="Expense not found")

    # Update the expense in DB
    updated_fields = {
        "title": expense.title,
        "amount": expense.amount,
        "category": expense.category,
        "date": expense.date   # type: ignore # make sure this matches your schema field
    }

    result = await db.expenses.update_one(
        {"_id": expense_id, "user_id": user_obj_id},
        {"$set": updated_fields}
    )

    # if result.modified_count == 0:
    #     raise HTTPException(status_code=404, detail="Expense not found or no changes made")

    expenses = []
    cursor = db.expenses.find({"_id": expense_id, "user_id": user_obj_id})
    async for doc in cursor:
        expenses.append(ExpenseOut(
            id=str(doc["_id"]),
            title=doc["title"],
            amount=doc["amount"],
            category=doc["category"],
            date=doc["date"]
        ))
    return expenses
    