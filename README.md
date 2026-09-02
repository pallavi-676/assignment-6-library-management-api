# 📚 Library Management API

A complete Library Management System REST API built using Node.js, Express.js, Firebase Firestore, JWT authentication, and bcrypt.

## 📌 Project Overview

This project is a REST API for managing a library system.

The API provides:

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Student and Librarian role-based access
- Book management
- Book search
- Borrow and return functionality
- Transaction tracking
- User management
- Firebase Firestore database integration
- Swagger/OpenAPI API documentation
- Request validation
- Error handling
- Logging middleware
- Rate limiting

## 🛠️ Technologies Used

- Node.js
- Express.js
- Firebase Firestore
- Firebase Admin SDK
- JSON Web Token (JWT)
- bcrypt
- Swagger / OpenAPI
- express-validator
- express-rate-limit
- Helmet
- CORS
- Nodemon

## 👥 User Roles

### Student

Students can:

- View books
- Search for books
- Borrow books
- Return books
- View their transaction history
- View and update their profile

### Librarian

Librarians can:

- View books
- Add books
- Update books
- Delete books
- Manage users
- Update user roles
- View transactions

Role-based access is handled using authentication and role middleware.

## ✨ Main Features

### 🔐 Authentication

- User registration
- User login
- JWT token authentication
- Password hashing with bcrypt
- Profile management

### 📚 Book Management

- View all books
- View a single book
- Add a new book
- Update book details
- Delete a book
- Search books
- Track book availability

### 🔄 Borrow and Return

Students can borrow and return books.

The system keeps track of:

- Borrowing activity
- Return activity
- Due dates
- Transaction information

### 👤 User Management

Librarians can:

- View all users
- View individual users
- Update user roles
- Delete users

## 🛡️ Middleware

The project includes middleware for:

- JWT authentication
- Role-based authorization
- Request logging
- Request validation
- Rate limiting
- Centralized error handling

## 🗄️ Database

Firebase Firestore is used as the database.

The main collections are:

- Users
- Books
- Transactions

## 📋 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |
| GET | `/api/auth/profile` | Get logged-in user profile |
| PUT | `/api/auth/profile` | Update user profile |

### Books

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get a single book |
| GET | `/api/books/search` | Search books |
| POST | `/api/books` | Add a new book - Librarian |
| PUT | `/api/books/:id` | Update a book - Librarian |
| DELETE | `/api/books/:id` | Delete a book - Librarian |

### Borrow and Return

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/books/:id/borrow` | Borrow a book - Student |
| POST | `/api/books/:id/return` | Return a book - Student |

### Transactions

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/transactions` | Get all transactions - Librarian |
| GET | `/api/transactions/my` | Get user's transaction history |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get all users - Librarian |
| GET | `/api/users/:id` | Get user details - Librarian |
| PUT | `/api/users/:id/role` | Update user role - Librarian |
| DELETE | `/api/users/:id` | Delete user - Librarian |

## 📁 Project Structure

~~~text
library-management-api/
│
├── docs/
│   └── swagger.yaml
│
├── src/
│   ├── config/
│   │   ├── firebase.js
│   │   └── swagger.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── transactionController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── role.js
│   │   └── validator.js
│   │
│   ├── models/
│   │   ├── bookModel.js
│   │   ├── transactionModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── userRoutes.js
│   │
│   └── utils/
│       ├── jwt.js
│       └── validation.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
~~~

## ⚙️ Installation

### 1. Clone the repository

~~~bash
git clone <repository-url>
~~~

### 2. Open the project

~~~bash
cd library-management-api
~~~

### 3. Install dependencies

~~~bash
npm install
~~~

### 4. Configure environment variables

Create a `.env` file based on `.env.example`.

Example:

~~~env
PORT=3000
JWT_SECRET=your_jwt_secret
~~~

Firebase credentials should be configured locally and should not be committed to GitHub.

### 5. Start the server

~~~bash
npm start
~~~

For development:

~~~bash
npm run dev
~~~

The server runs on:

~~~text
http://localhost:3000
~~~

## 📖 Swagger API Documentation

Swagger UI is available at:

~~~text
http://localhost:3000/api-docs
~~~

Swagger provides API documentation and allows the endpoints to be tested directly.

## 🔑 Authentication

After logging in, the API returns a JWT token.

Protected endpoints require the JWT token in the authorization header:

~~~text
Authorization: Bearer <JWT_TOKEN>
~~~

Users must have the appropriate role to access role-protected endpoints.

## 🧪 Testing

The API can be tested using:

- Swagger UI
- Postman
- Insomnia

The main functionality tested includes:

- User registration
- User login
- JWT authentication
- Profile access
- Book creation
- Book retrieval
- Book search
- Book updates
- Book borrowing
- Book returning
- Transaction management
- Role-based authorization

## 🔒 Security

The project includes:

- JWT authentication
- bcrypt password hashing
- Role-based authorization
- Request validation
- Rate limiting
- Helmet security middleware
- CORS
- Centralized error handling

Sensitive files such as `.env` and Firebase service account credentials must not be uploaded to GitHub.

## ✅ Assignment Requirements

This project covers the required areas of the Library Management API assignment:

- REST API development
- JWT authentication
- bcrypt password hashing
- Firebase Firestore integration
- Student and Librarian roles
- Book CRUD operations
- Borrow and return system
- Transaction tracking
- User management
- Authentication middleware
- Role middleware
- Logging middleware
- Validation middleware
- Error handling
- Rate limiting
- Swagger/OpenAPI documentation

## 👩‍💻 Author

**Pallavi Sarovar**

Library Management API Assignment
