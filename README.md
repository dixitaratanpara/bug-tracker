# 🐞 Bug Tracker - MERN Stack Project

A full-stack Bug Tracking System built using the **MERN Stack**. This application allows teams to manage software bugs efficiently with secure authentication, role-based access control, and bug management features.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Forgot Password (Email)
- Reset Password
- Change Password

### 👤 User Profile
- View Profile
- Edit Profile

### 🐞 Bug Management
- Create Bug
- View All Bugs
- View Single Bug
- Edit Bug
- Delete Bug (Admin Only)

### 📊 Dashboard
- Search Bugs
- Filter by Status
- Filter by Priority
- Sort by Latest/Oldest
- Pagination
- Statistics Cards

### 🔒 Role Based Access

#### 👨‍💼 Admin
- View all bugs
- Create bugs
- Edit any bug
- Delete any bug

#### 👨‍💻 Developer
- View all bugs
- Create bugs
- Edit bugs
- Cannot delete bugs

#### 🧪 Tester
- View all bugs
- Cannot create bugs
- Cannot edit bugs
- Cannot delete bugs

---

## 🛠 Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- React Toastify
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer

---

## 📁 Project Structure

```
bug-tracker/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── style/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
```

---

### Backend

```bash
cd backend
npm install
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET_KEY

EMAIL_USER=YOUR_EMAIL

EMAIL_PASS=YOUR_APP_PASSWORD
```

---

## 📌 API Endpoints

### Authentication

```
POST    /api/auth/register

POST    /api/auth/login

GET     /api/auth/me

PUT     /api/auth/change-password

POST    /api/auth/forgot-password

POST    /api/auth/reset-password/:token
```

---

### Bugs

```
GET     /api/bugs

GET     /api/bugs/:id

POST    /api/bugs

PUT     /api/bugs/:id

DELETE  /api/bugs/:id
```

---

## 📷 Screenshots

You can add screenshots here after deployment.

Example:

```
Dashboard Screenshot

Login Page

Profile Page

Create Bug Page
```

---

## 🔮 Future Improvements

- Assign Bugs to Developers
- Bug Comments
- Image/File Attachments
- Email Notification on Status Change
- Activity Timeline
- Dark Mode
- User Avatar Upload

---

## 📚 What I Learned

- MERN Stack Development
- REST API Development
- JWT Authentication
- Role-Based Authorization
- MongoDB & Mongoose
- Password Reset using Email
- CRUD Operations
- React Routing
- Axios API Integration
- Pagination
- Search & Filtering
- Git & GitHub Workflow

---

## 👩‍💻 Author

**Dixita Ratanpara**

GitHub:
https://github.com/YOUR_GITHUB_USERNAME

---

## 📄 License

This project is created for learning and portfolio purposes.
