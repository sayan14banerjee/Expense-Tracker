"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../api/auth"
import { createExpense, getAllExpenses, getExpensesByDate } from "../api/dashboard"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import "../styles/dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate("/login")
  }

  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  })

  const [filterCategory, setFilterCategory] = useState("All")
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateExpenses, setSelectedDateExpenses] = useState([])

  // Helper function to format date consistently
  const formatDateToString = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Helper function to create date from string without timezone issues
  const createDateFromString = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number)
    return new Date(year, month - 1, day) // month is 0-indexed in JavaScript
  }

  // Helper function to check if two dates are the same day
  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate()
  }

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        setLoading(true)
        const data = await getAllExpenses()
        setExpenses(data)
      } catch (error) {
        console.error("Failed to load expenses:", error)
      } finally {
        setLoading(false)
      }
    }

    loadExpenses()
  }, [])

  useEffect(() => {
    const loadExpensesByDate = async () => {
      if (selectedDate) {
        try {
          const dateStr = formatDateToString(selectedDate)
          const data = await getExpensesByDate(dateStr)
          setSelectedDateExpenses(data)
        } catch (error) {
          console.error("Failed to load expenses by date:", error)
          setSelectedDateExpenses([])
        }
      } else {
        setSelectedDateExpenses([])
      }
    }

    loadExpensesByDate()
  }, [selectedDate])

  const handleAddExpense = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      const expenseData = {
        title: newExpense.title,
        amount: Number.parseFloat(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
      }

      const createdExpense = await createExpense(expenseData)
      setExpenses([...expenses, createdExpense])
      setNewExpense({ title: "", amount: "", category: "", date: "" })
    } catch (error) {
      console.error("Failed to create expense:", error)
      alert("Failed to add expense. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const filteredExpenses =
    filterCategory === "All" ? expenses : expenses.filter((exp) => exp.category === filterCategory)

  const expensesForSelectedDate = selectedDateExpenses

  const totalExpenses = expenses.reduce((sum, exp) => sum + Number.parseFloat(exp.amount), 0)
  const monthlyExpenses = expenses
    .filter((exp) => {
      const expDate = createDateFromString(exp.date)
      const currentDate = new Date()
      return expDate.getMonth() === currentDate.getMonth() && expDate.getFullYear() === currentDate.getFullYear()
    })
    .reduce((sum, exp) => sum + Number.parseFloat(exp.amount), 0)

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Number.parseFloat(exp.amount)
    return acc
  }, {})

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <h2>Loading your expenses...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Expense Tracker</h1>
          <p className="dashboard-subtitle">Manage your finances with ease</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <span>Logout</span>
        </button>
      </header>

      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3 className="stat-value">₹{totalExpenses.toFixed(2)}</h3>
              <p className="stat-label">Total Expenses</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3 className="stat-value">₹{monthlyExpenses.toFixed(2)}</h3>
              <p className="stat-label">This Month</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3 className="stat-value">{expenses.length}</h3>
              <p className="stat-label">Total Transactions</p>
            </div>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="expense-form-section">
          <div className="section-header">
            <h2 className="section-title">Add New Expense</h2>
            <p className="section-subtitle">Track your spending</p>
          </div>
          <form className="expense-form" onSubmit={handleAddExpense}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter expense title"
                value={newExpense.title}
                onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                required
                disabled={submitting}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Amount</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                placeholder="0.00"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                required
                disabled={submitting}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                required
                disabled={submitting}
              >
                <option value="">Select Category</option>
                <option value="Food">🍔 Food</option>
                <option value="Transport">🚗 Transport</option>
                <option value="Entertainment">🎬 Entertainment</option>
                <option value="Others">📦 Others</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                required
                disabled={submitting}
              />
            </div>
            <button type="submit" className="form-submit-btn" disabled={submitting}>
              <span>{submitting ? "Adding..." : "Add Expense"}</span>
            </button>
          </form>
        </section>

        <section className="calendar-section">
          <div className="section-header">
            <h2 className="section-title">Expense Calendar</h2>
            <p className="section-subtitle">View expenses by date</p>
          </div>
          <div className="calendar-wrapper">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="expense-calendar"
              tileContent={({ date, view }) => {
                if (view !== 'month') return null
                
                const hasExpense = expenses.some((exp) => {
                  const expenseDate = createDateFromString(exp.date)
                  return isSameDay(date, expenseDate)
                })
                
                return hasExpense ? <div className="expense-dot"></div> : null
              }}
            />
          </div>
          {selectedDate && (
            <div className="selected-date-expenses">
              <h3 className="selected-date-title">
                Expenses for {selectedDate.toLocaleDateString()}
              </h3>
              {expensesForSelectedDate.length > 0 ? (
                <div className="expense-list">
                  {expensesForSelectedDate.map((exp) => (
                    <div key={exp.id} className="expense-item">
                      <div className="expense-info">
                        <span className="expense-title">{exp.title}</span>
                        <span className={`expense-category category-${exp.category.toLowerCase()}`}>
                          {exp.category}
                        </span>
                      </div>
                      <span className="expense-amount">₹{exp.amount}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-expenses">No expenses on this day</p>
              )}
            </div>
          )}
        </section>
      </div>

      <section className="expense-list-section">
        <div className="section-header">
          <h2 className="section-title">All Expenses</h2>
          <div className="filter-wrapper">
            <label className="filter-label">Filter by Category:</label>
            <select
              className="filter-select"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Food">🍔 Food</option>
              <option value="Transport">🚗 Transport</option>
              <option value="Entertainment">🎬 Entertainment</option>
              <option value="Others">📦 Others</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="table-row">
                  <td className="expense-title-cell">{exp.title}</td>
                  <td className="expense-amount-cell">₹{exp.amount}</td>
                  <td>
                    <span className={`category-badge category-${exp.category.toLowerCase()}`}>{exp.category}</span>
                  </td>
                  <td className="expense-date-cell">
                    {createDateFromString(exp.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default Dashboard