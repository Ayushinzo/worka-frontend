# Worka – Project Management App

Worka is a full-stack project management application that helps teams organize projects, manage tasks, and collaborate efficiently. The project is divided into two main folders:

- [`frontend`](frontend/): React + Vite application for the user interface.
- [`backend`](backend/): Node.js + Express API server with MongoDB.

---

## Features

- User authentication with Auth0
- Project and task management
- Kanban board for task tracking
- Team member invitations and workspace management
- Real-time project statistics and charts
- Responsive, modern UI with Material-UI and Tailwind CSS

---

## Folder Structure

```
project-management/
│
├── backend/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   ├── connectdb/
│   ├── email/
│   ├── models/
│   └── routes/
│
└── frontend/
    ├── .env
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── public/
    └── src/
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- [Auth0](https://auth0.com/) account for authentication

---

### 1. Backend Setup

1. `cd backend`
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file (see `.env.example` or below):

   ```
   PORT=3000
   FRONTEND_URL="http://localhost:5173"
   DATABASE_URL="mongodb://localhost:27017/worka"
   EMAIL_ADDRESS="your_gmail@gmail.com"
   APP_PASSWORD="your_gmail_app_password"
   ```

4. Start the backend server:
   ```sh
   npm run server
   ```

---

### 2. Frontend Setup

1. `cd frontend`
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file:

   ```
   VITE_FRONTEND_URL="http://localhost:5173"
   VITE_BACKEND_URL="http://localhost:3000"
   ```

4. Update Auth0 credentials in `src/main.jsx` if needed.
5. Start the frontend dev server:
   ```sh
   npm run dev
   ```

---

## Usage

- Visit [http://localhost:5173](http://localhost:5173) in your browser.
- Sign up or log in with Auth0.
- Create projects, invite team members, and manage tasks.

---

## Tech Stack

- **Frontend:** React, Vite, Material-UI, Tailwind CSS, Auth0
- **Backend:** Node.js, Express, MongoDB, Mongoose, Nodemailer, helmet

---

## License

This project is for educational purposes.

---

## Contact

For support, email: ayushshembekar07@gmail.com

---

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)