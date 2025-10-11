import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI") 
if not MONGO_URI:
    raise ValueError("No Mongo URI found in environment variables!")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
db = client["expense_tracker"]
print(f"✅ Connected to MongoDB at {MONGO_URI}")
