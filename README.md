# 🔐 JWT Authentication API (Node.js + TypeScript)

A clean and secure authentication API built using Node.js, Express, TypeScript, and JWT.  
It demonstrates user registration, login, and protected routes with proper backend architecture.

---

## 🚀 Features

- User registration with hashed passwords (bcrypt)
- Secure login with JWT authentication
- Protected routes using middleware
- Input validation using Zod
- File-based storage (JSON database simulation)
- Clean layered architecture (Controller → Service → Repository)
- Type-safe TypeScript implementation

---

## 🏗️ Tech Stack

- Node.js
- Express.js
- TypeScript
- Zod
- bcrypt
- jsonwebtoken
- UUID

---

## 📁 Project Structure
src/
├── config/
├── controllers/
├── middleware/
├── repositories/
├── schemas/
├── services/
├── types


---

## ⚙️ Installation

### 1. Clone repo

```bash
git clone https://github.com/You-welcome360/Mino-Health
cd Mino-Health

2. Install dependencies
npm install

3. Create .env
PORT=5000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=15m

4. Run project (dev)
npm run dev

📡 API Endpoints
🔹 Register User
POST /api/auth/register
{
  "username": "raymond",
  "password": "password123"
}
🔹 Login User
POST /api/auth/login
{
  "username": "raymond",
  "password": "password123"
}
🔹 Get Profile (Protected)
GET /api/auth/profile

Header:
Authorization: Bearer <token>

🔐 Authentication Flow
User registers
Password is hashed (bcrypt)
User logs in
JWT token is generated
Token is used to access protected routes

🧪 Example Response
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}

⚠️ Notes
This project uses file-based storage instead of a database
Not suitable for production
Built for learning and demonstration purposes

👨‍💻 Author

Raymond Oteng Amoah

⭐ If you like this project

Give it a star ⭐ and connect with me!


