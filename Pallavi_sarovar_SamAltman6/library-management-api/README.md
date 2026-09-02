# 📚 Library Management API

Node.js + Express + Firebase Firestore + JWT + bcrypt REST API.

## Features

- Student and Librarian roles
- JWT authentication
- bcrypt password hashing
- Firebase Firestore
- Book CRUD
- Borrow and return
- Transaction history
- Role-based middleware
- Request logging
- Rate limiting
- Validation
- Swagger UI
- Helmet and CORS

## Setup

### 1. Install Node.js

Use a current LTS version.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a Firebase project with Firestore enabled.

Create a Firebase Admin SDK service account and copy its credentials into `.env`.

Copy `.env.example` to `.env` and fill in:

```text
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
JWT_SECRET=
PORT=3000
```

### 4. Start

Development:

```bash
npm run dev
```

Normal:

```bash
npm start
```

### 5. Swagger

Open:

```text
http://localhost:3000/api-docs
```

## Main endpoints

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/profile`
- PUT `/api/auth/profile`

### Books

- GET `/api/books`
- GET `/api/books/:id`
- POST `/api/books` — librarian
- PUT `/api/books/:id` — librarian
- DELETE `/api/books/:id` — librarian
- GET `/api/books/search`
- POST `/api/books/:id/borrow` — student
- POST `/api/books/:id/return` — student

### Transactions

- GET `/api/transactions` — librarian
- GET `/api/transactions/my`

### Users

- GET `/api/users` — librarian
- GET `/api/users/:id` — librarian
- PUT `/api/users/:id/role` — librarian
- DELETE `/api/users/:id` — librarian

## Important

Do not commit `.env` or Firebase private credentials to GitHub.

Use `.env.example` for submission documentation.
