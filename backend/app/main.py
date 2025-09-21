from fastapi import FastAPI
from app.routes import user, expense


# Create FastAPI instance
app = FastAPI(
    title="Expense Tracker API",
    description="A production-ready Expense Tracker API with FastAPI + MongoDB",
    version="1.0.0",
    docs_url="/docs",       # Swagger UI
    redoc_url="/redoc",     # ReDoc UI
    openapi_url="/openapi.json"
)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(expense.router)
@app.get("/")
async def root():
    return {"message": "Welcome to Expense Tracker API"}
