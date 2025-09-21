# Expense Tracker

A full-stack **Expense Tracker** application built with **FastAPI** (backend), **React** (frontend), and **MongoDB** for data storage. This application allows users to track their daily expenses, manage budgets, and view expense reports. It is Dockerized for easy deployment.

---

## 🔹 Features

- User authentication with **JWT tokens**
- Add, update, and delete expenses
- Filter expenses by **date** or **category**
- Secure API endpoints with authentication
- Responsive frontend built with **React**
- Dockerized backend and frontend for easy deployment

---

## 🛠️ Tech Stack

**Backend:**  
- FastAPI  
- Python 3.11  
- MongoDB (Async with Motor)  
- JWT Authentication  
- Pydantic Models  

**Frontend:**  
- React  
- Axios for API requests  
- Vite as bundler  

**DevOps / Deployment:**  
- Docker & Docker Compose  
- Environment variables for configuration  

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/sayan14banerjee/Expense-Tracker.git
cd Expense-Tracker
```

### 2. Setup environment variables
Create a `.env` file in the root folder:

```env
DATABASE_URL="mongodb://mongo:27017"
SECRET_KEY="your_secret_key_here"
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. Run with Docker Compose

```bash
docker-compose up --build
```

- Backend will be available at `http://localhost:8000/`
- Frontend will be available at `http://localhost:3000/`

---

## 📁 Project Structure

```
Expense-Tracker/
├─ backend/               # FastAPI backend
│  ├─ app/
│  │  ├─ routes/          # API routes
│  │  ├─ functions/       # Business logic (login, expenses, etc.)
│  │  ├─ database.py      # DB connection
│  │  └─ main.py
├─ frontend/              # React frontend
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  └─ api.js
├─ .env                   # Environment variables
├─ docker-compose.yml
└─ README.md
```

---

## 🔐 Authentication Flow

1. User registers/login via `/users/login` endpoint
2. JWT token is generated and returned
3. Token is stored in **localStorage** on frontend
4. Protected endpoints require `Authorization: Bearer <token>` header

---

## 💻 Usage

1. Open `http://localhost:3000/` in your browser
2. Register or login
3. Add new expenses or view existing ones
4. Filter by date or category to analyze spending

---

## ⚡ Contributing

1. Fork the repo
2. Create a new branch `git checkout -b feature-name`
3. Commit your changes `git commit -m "Description"`
4. Push `git push origin feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## 🔗 Demo

*(Optional: Add deployed link if available)*
- Frontend: `http://localhost:3000/`
- Backend API: `http://localhost:8000/`