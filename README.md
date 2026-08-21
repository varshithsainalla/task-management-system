# Task Management System

A full-stack Task Management System built using **React.js, Node.js, Express.js, and MongoDB**. The application allows users to securely register, log in, and manage their tasks.

## 🚀 Features

* User Registration and Login
* JWT Authentication
* Password Encryption
* Create, Read, Update and Delete Tasks
* Search Tasks
* Filter by Status and Priority
* Sort Tasks
* Pagination
* RESTful APIs
* MongoDB Database
* React Frontend

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* React Router
* JavaScript
* CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* dotenv
* CORS

### Tools

* VS Code
* MongoDB Compass
* Postman
* Git & GitHub

## 📂 Project Structure

```text
task-management-system/
│
├── task-management-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── task-management-backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🔗 API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Tasks

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/api/tasks`     | Create a task       |
| GET    | `/api/tasks`     | Get all tasks       |
| GET    | `/api/tasks/:id` | Get a specific task |
| PUT    | `/api/tasks/:id` | Update a task       |
| DELETE | `/api/tasks/:id` | Delete a task       |

### Task Query Parameters

The `GET /api/tasks` endpoint supports:

```text
search
status
priority
sortBy
order
page
limit
```

Example:

```text
GET /api/tasks?search=&status=&priority=&sortBy=createdAt&order=desc&page=1
```

## 🔐 Authentication

Protected APIs require a JWT token.

Add the following header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

The token is received after successful login.

## ⚙️ Installation

### Backend

```bash
cd task-management-backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

### Frontend

Open another terminal:

```bash
cd task-management-frontend
npm install
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

The backend will normally run at:

```text
http://localhost:5000
```

## 🧪 API Testing

The backend APIs can be tested using **Postman**.

Recommended testing order:

1. Register user
2. Login
3. Copy JWT token
4. Add token as `Bearer Token`
5. Create task
6. Get tasks
7. Update task
8. Delete task

## 🔄 Application Flow

```text
React Frontend
      ↓
Express.js REST API
      ↓
JWT Authentication
      ↓
Mongoose
      ↓
MongoDB
```

## 🔮 Future Enhancements

* Task reminders
* Due dates
* Email notifications
* Dashboard analytics
* Task categories
* Admin dashboard
* Dark mode

## 👨‍💻 Author

**Nalla Varshith Sai**

GitHub: https://github.com/varshith403

## 📄 License

This project is developed for educational and development purposes.
