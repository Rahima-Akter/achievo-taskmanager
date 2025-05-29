# 🌿 **Achievo** – Task Management System

Welcome to **Achievo**, a full-stack task management system with both **frontend** and **backend** built using modern technologies like **React**, **Node.js**, **MongoDB**, **Firebase**, **Tailwind CSS**, and **Vite**. This project allows users to manage tasks efficiently in a fast and secure environment.

---

## 📋 Features

- ✅ **Task management** – Create, read, update, and delete tasks from both the frontend and backend
- ⚡ **React frontend** – Fast, dynamic user interface
- 🎨 **Tailwind CSS** – Utility-first styling on the frontend
- 🔐 **Firebase authentication** – Secure Google sign-in
- 🗄️ **MongoDB** – Stores tasks and user data in the backend
- 🔄 **React Query** – Handles data fetching and state management
- ⚙️ **Express API** – Manages routes and logic on the server
- 🛠️ **CORS** – Secure communication between frontend and backend
- 📝 **Morgan** – Logs HTTP requests in the backend

---

## 🛠️ Technologies Used

### Frontend:

- **React**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **Firebase**
- **React Query**
- **Axios**
- **SweetAlert2**
- **@hello-pangea/dnd**

### Backend:

- **Node.js**
- **Express.js**
- **MongoDB**
- **CORS**
- **dotenv**
- **Morgan**

---

## 📥 Installation Instructions

### 🖥️ Prerequisites

- ✅ [Node.js](https://nodejs.org/)
- ✅ MongoDB instance (local or cloud)
- ✅ Firebase project with API keys

---

### ⚙️ Steps to Get Started

1. **Clone the Repository**

```bash
git clone https://github.com/Rahima-Akter/achievo-taskmanager.git

```

2. **Set up the frontend**:

- Navigate to the frontend directory and install dependencies:

```bash
cd achievo-client
npm install
```

- Set up Firebase configuration in the `.env` file:

```ini
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

3. **Set up the backend**:

- Navigate to the backend directory and install dependencies:

```bash
cd achievo-server
npm install
```

- Set up environment variables for the backend in the `.env` file:

```ini
MONGODB_URI=mongodb://your-mongodb-uri
```

4. **Start the backend server**:

- To start the backend server in production mode:

```bash
npm start
```

- Or for development mode (with auto-reloading):

```bash
npm run dev
```

- The backend should now be running on `https://achievo.vercel.app` (or the configured port).

5. **Start the frontend development server**:

- To start the frontend in development mode:

```bash
cd achievo-client
npm run dev
```

- The frontend should now be running on `http://localhost:5173`. (or whichever port you have configured).

---

## 🌐 API Endpoints

| Method | Endpoint                   | Description                                  |
|--------|----------------------------|----------------------------------------------|
| POST   | `/jwt`                     | Generate JWT token                           |
| GET    | `/sign-out`                | Clear JWT token                              |
| POST   | `/tasks`                   | Create a new task                            |
| GET    | `/tasks/:email`            | Get all tasks for a user                     |
| DELETE | `/delete-single-task/:id`  | Delete a task                                |
| GET    | `/task-by-id/:id`          | Get task details                             |
| PATCH  | `/task-by-id/:id`          | Update task info                             |
| PATCH  | `/in-progress/:id`         | Change task category to "in-progress"        |
| PATCH  | `/done/:id`                | Change task category to "done"               |
| PATCH  | `/update-categories/:id`   | Change task category                         |
| POST   | `/goal/:email`             | Create a goal                                |
| PATCH  | `/completed/:id`           | Update goal progress                         |
| GET    | `/get-goal/:email`         | Fetch user goals                             |
| DELETE | `/delete-goal/:id`         | Delete goal                                  |
| POST   | `/users/:email`            | Register a new user                          |
| GET    | `/user/:email`             | Fetch user info                              |
| GET    | `/quotes`                  | Fetch inspirational quotes                   |


---

## 🤝 **Contributing**

Feel free to fork and contribute to this project! Here's how you can help:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new pull request.

---

## 📬 **Contact**

For any questions or suggestions, please contact me directly!

---

## Happy Task Managing with Achievo!

🚀 [Live Link](https://achievo-task-manager.netlify.app/)
