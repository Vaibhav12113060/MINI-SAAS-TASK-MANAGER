# 🚀 VaibFlow - Mini SaaS Task Manager

VaibFlow ek robust Full-Stack Task Management application hai jo efficiency aur seamless user experience ke liye design ki gayi hai. Ye project modern web development practices aur Cloud-native architecture ka ek behtareen udaharan hai.

[![Deploy to Netlify](https://api.netlify.com/api/v1/badges/YOUR_BADGE_ID/deploy-status)](https://vaibflow.netlify.app)

**🔗 Live Deployment: [https://vaibflow.netlify.app](https://vaibflow.netlify.app)**

---

## 🛠 Tech Stack

### Frontend

- **Library:** [React.js](https://react.dev/) (Vite)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **API Management:** [Axios](https://axios-http.com/) (with Interceptors for JWT handling)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Deployment:** [Netlify](https://www.netlify.com/) [1]

### Backend

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (Hosted on [Neon DB](https://neon.tech/))
- **ORM:** [Sequelize](https://sequelize.org/)
- **Security:** [JWT (JSON Web Tokens)](https://jwt.io/) & [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) [3, 5, 7, 11, 14, 16, 17, 24, 25]
- **Logging & Debugging:** [Morgan](https://www.npmjs.com/package/morgan) & [Nodemon](https://nodemon.io/)
- **Deployment:** [Render](https://render.com/) [33, 35, 42, 44, 45, 46]

---

## 📂 Project Structure

### Backend Architecture

```
Backend/
├── config/             # Database connectivity & Sequelize initialization
├── controllers/        # Logical handling of Auth and Task requests
├── middlewares/        # JWT verification & Error Handling logic
├── models/             # Database schemas (User & Task models)
├── routes/             # Express routes for API endpoints
├── .env                # Secret environment variables
├── package.json        # Dependencies & scripts
└── server.js           # Server entry point & DB sync
```

### Frontend Architecture

```
Frontend/
├── public/             # Static assets
├── src/
│   ├── api/            # Axios instance & API endpoint configurations
│   ├── components/     # Reusable UI components (Navbar, Sidebar, etc.)
│   ├── pages/          # Full page views (Login, Signup, Dashboard)
│   ├── App.jsx         # Main application logic & routing
│   └── main.jsx        # Entry point for React
├── .env                # Base URL for API
└── vite.config.js      # Vite configuration
```

---

## ⚙️ Installation & Setup

### 1. Backend Setup

```bash
# Clone the repository
git clone <your-repo-link>

# Go to Backend directory
cd Backend

# Install dependencies
npm install

# Create .env file and add your credentials
# DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET

# Start development server
npm run dev
```

### 2. Frontend Setup

```bash
# Go to Frontend directory
cd Frontend

# Install dependencies
npm install

# Create .env file
# VITE_API_URL=http://localhost:5000/api

# Run the app
npm run dev
```

---

## 🌐 Deployment Details

- **Database:** PostgreSQL database ko [Neon.tech](https://neon.tech/) par host kiya gaya hai (Serverless Postgres).
- **Backend:** Backend service ko [Render.com](https://render.com/) par deploy kiya gaya hai. [33, 35, 42, 44, 45, 46]
- **Frontend:** Static frontend [Netlify](https://www.netlify.com/) par hosted hai, jo backend API ke saath sync hai. [1, 8, 12, 15, 18, 30]
- **CORS:** Cross-Origin Resource Sharing ko configure kiya gaya hai taaki frontend aur backend ke beech secure communication ho sake.

---

## ✨ Features

- [x] Secure User Authentication (Signup/Login)
- [x] Complete CRUD operations for Tasks
- [x] Responsive Dashboard for Mobile and Desktop
- [x] Secure Token-based Authentication (JWT)
- [x] Real-time Database Sync with `Sequelize alter: true`

---

## 📸 Showcase

Here's a glimpse of VaibFlow in action:

### Responsive Dashboard

![Dashboard](./public/Dashboard.png)

### User Profile Management

![Profile Page](./public/Profile_Page.png)

---

## 🔗 Backend API

The backend for this project is hosted on Render. You can find the base URL below:

**API URL:** https://mini-saas-task-manager-x6se.onrender.com

Here's a snapshot of the API endpoints tested with Postman:

![Backend API](./public/Backend_API.png)

---
