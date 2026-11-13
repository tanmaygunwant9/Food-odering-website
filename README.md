<div align="center">

# 🍔 Quick Canteen

### A Simple, Points-Based Online Canteen Ordering System

A web application that lets students create an account, manage canteen points, browse meals, and place food orders — with a separate admin dashboard for managing points and viewing orders.

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

</div>

---

## 📌 Overview

**Quick Canteen** is a lightweight online food-ordering project designed around a prepaid points system. Students can register using a student ID, receive points through the admin dashboard, and spend those points to order food. The backend stores account balances and order records in JSON files.

The project contains three main parts:

- **Student frontend** — account creation, login, points dashboard, and food ordering.
- **Admin frontend** — search student accounts, add points, and view recorded orders.
- **Backend API** — handles account operations, point updates, and order placement using Node.js and Express.

## ✨ Features

### 👨‍🎓 Student Portal
- Create an account using a student ID.
- Log in to an existing account.
- View the current points balance.
- Browse the available food menu.
- Select a meal and quantity.
- Place an order using available points.
- View the order confirmation and order number.
- Log out of the account.

### 🛠️ Admin Dashboard
- Search for a student account.
- View a student's current points balance.
- Add points to an existing account.
- View the orders stored by the system, including order number, student ID, meal, quantity, points used, and timestamp.

### ⚙️ Backend
- REST API built with Express.
- JSON-file persistence for accounts and orders.
- Automatic order-number generation.
- Basic request validation and error responses.
- CORS enabled for frontend requests.

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Frontend interactions and API requests |
| Node.js | Backend runtime |
| Express.js | REST API |
| CORS | Cross-origin requests |
| JSON files | Local data storage |

## 📁 Project Structure

```text
Food-odering-website/
│
├── admin-frontend/
│   └── index.html          # Admin dashboard
│
├── backend/
│   ├── index.js            # Express server and API routes
│   ├── accounts.json       # Student account balances
│   ├── orders.json         # Stored order records
│   └── package.json        # Backend dependencies
│
├── user-frontend/
│   ├── index.html          # Student login and dashboard
│   ├── order.html          # Food ordering page
│   ├── contact.html        # Contact page
│   ├── script.js           # Frontend logic and API calls
│   ├── styles.css          # Main stylesheet
│   ├── STYLE.css           # Additional stylesheet
│   └── pz.jpg              # Image asset
│
└── README.md
```

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (includes npm)
- A modern web browser
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)

### 2. Clone the repository

```bash
git clone https://github.com/your-username/your-repository-name.git
cd Food-odering-website
```

Replace the repository URL with your own GitHub repository URL.

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Start the backend server

```bash
node index.js
```

The API server runs at:

```text
http://localhost:3000
```

You should see:

```text
Server is running on port 3000
```

### 5. Open the frontend

Open `user-frontend/index.html` in your browser, or use the **Live Server** extension in Visual Studio Code.

Open the admin dashboard separately:

```text
admin-frontend/index.html
```

> **Important:** The frontend files currently contain API endpoint addresses in their JavaScript. For a local setup, configure all frontend API requests to use `http://localhost:3000`. The student frontend currently has a deployed API URL, while the order and admin pages use the local API URL. These should be made consistent before testing locally or deploying.

## 🔌 API Reference

The backend currently exposes the following routes:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/create-account` | Create a student account |
| `GET` | `/get-account?username={id}` | Retrieve an account and its points |
| `POST` | `/add-points` | Add points to an existing account |
| `POST` | `/place-order` | Place an order and deduct points |
| `GET` | `/orders` | Retrieve the stored orders |

### Example request bodies

**Create account**
```json
{
  "username": "STU1001"
}
```

**Add points**
```json
{
  "username": "STU1001",
  "points": 100
}
```

**Place an order**
```json
{
  "username": "STU1001",
  "meal": "Pizza",
  "quantity": 2,
  "totalPoints": 100
}
```

**Example successful order response**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "orderNumber": 1,
  "remainingPoints": 50
}
```

## 🍕 Current Menu

The ordering page includes the following sample menu items:

| Item | Price |
|---|---:|
| Pizza | 50 points |
| Burger | 40 points |
| Pasta | 30 points |
| Sandwich | 20 points |

The total points required are calculated using the selected meal price and quantity.

## 💾 Data Storage

This version uses local JSON files instead of a database:

- `backend/accounts.json` stores student accounts and their point balances.
- `backend/orders.json` stores order details grouped by student ID.

These files are created/updated by the backend. Keep backups of them if you are using the project with real test data.

## 🔮 Future Improvements

Some useful enhancements for a future version:

- Secure student and admin authentication.
- Password protection and role-based access control.
- Move from JSON files to a database such as MongoDB or MySQL.
- Centralize the backend URL in a configuration file or environment variable.
- Add order status tracking (pending, preparing, completed).
- Add menu management from the admin dashboard.
- Add order history for individual students.
- Improve validation, error handling, and automated tests.
- Add payment gateway integration.

## ⚠️ Current Project Notes

This repository is a learning/project implementation and should not be used as-is for production or real student accounts.

- Account creation currently uses a student ID only; it does not implement password-based authentication.
- The admin page does not currently implement admin login or authorization.
- JSON-file storage is suitable for a small demo, but not for concurrent or production workloads.
- Configure the API URL consistently across the student, order, and admin frontends.
- The backend defines two `GET /orders` handlers. In Express, the first matching handler responds first, so the user-specific orders handler should be consolidated into the same route or assigned a distinct endpoint.

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

## 📄 License

No license has been specified for this project yet. Add a `LICENSE` file if you want to define permissions for reuse and contributions.

---

<div align="center">

**Built with ❤️ for a smarter canteen experience.**

If you find this project useful, consider giving the repository a ⭐ on GitHub.

</div>
