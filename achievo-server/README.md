# 🌿 Achievo Server – Task & Goal Management API

**Achievo Server** is the backend of a productivity and task management system built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)**. This server provides robust APIs for users to manage tasks, goals, and authentication in a structured and secure way.

---

## 📦 Features

- ✅ **User Authentication** (JWT + cookies)
- ✅ **Task Management** – Create, Read, Update, Delete (CRUD)
- ✅ **Goal Tracking** – Set, update, and delete personal goals
- ✅ **MongoDB with Mongoose** – Structured schema-based data storage
- ✅ **Secure Cookies** – For authentication handling
- ✅ **Zen Quotes API** – Daily motivational quotes
- 🛡️ **Middleware** for auth and error handling
- 📑 **Logging** with **Morgan**
- 🌐 **CORS** configured for frontend access

---

## ⚙️ Tech Stack

| Tool          | Purpose                               |
|---------------|----------------------------------------|
| Node.js       | JavaScript runtime                     |
| Express.js    | Web server and routing                 |
| Mongoose      | MongoDB object modeling                |
| MongoDB       | NoSQL database                         |
| JWT           | Authentication and user verification   |
| Morgan        | Logs HTTP requests                     |
| dotenv        | Manage environment variables           |
| CORS          | Handle cross-origin requests           |
| Cookie-Parser | Parse and manage cookies               |

---

## 📥 Installation & Setup

### 🧰 Prerequisites

- Node.js installed – [https://nodejs.org/](https://nodejs.org/)
- MongoDB (local or Atlas)

---

### 🚀 Getting Started

1. **Clone the project**

```bash
git clone https://github.com/Rahima-Akter/achievo-taskmanager.git
cd achievo-server

2. **Install dependencies:**:
➡ Install all the required dependencies listed in the package.json file by running:
```bash
npm install
```
3. **Set up environment variables:**:
➡ Install all the required dependencies listed in the package.json file by running:
```bash
npm install
```
- ➡ Create a .env file in the root of the project to store sensitive information like the MongoDB connection string. 
# Example:
-  MONGODB_URI=mongodb://your-mongodb-uri
4. **Start the server:**:
- ➡ To start the server in production mode, run:
```bash
npm install
```
- ➡ Create a .env file in the root of the project to store sensitive information like the MongoDB connection string. 
```bash
npm start
```
5. **To start the server in development mode (with auto-reloading), run:**:
```bash
npm run dev
```
6. **Access the server:**:
- Your server should now be running on https://achievo-server.vercel.app (or whichever port you have configured).

### 🌐 API Endpoints
-**You can interact with the backend through the following API endpoints:**
### 🔐 Auth
| Method | Endpoint    | Description                 |
| ------ | ----------- | --------------------------- |
| POST   | `/jwt`      | Create and return JWT token |
| GET    | `/sign-out` | Clear JWT cookie            |

### 👤 Users
| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/users/:email` | Create a user          |
| GET    | `/user/:email`  | Get user info by email |

###✅ Tasks
| Method | Endpoint                  | Description                      |
| ------ | ------------------------- | -------------------------------- |
| POST   | `/tasks`                  | Create a task                    |
| GET    | `/tasks/:email`           | Get tasks by user email          |
| GET    | `/task-by-id/:id`         | Get a task by ID                 |
| PATCH  | `/task-by-id/:id`         | Update task by ID                |
| DELETE | `/delete-single-task/:id` | Delete task by ID                |
| PATCH  | `/in-progress/:id`        | Set task category to in-progress |
| PATCH  | `/done/:id`               | Set task category to done        |
| PATCH  | `/update-categories/:id`  | Change category to custom value  |

### 🎯 Goals
| Method | Endpoint           | Description                |
| ------ | ------------------ | -------------------------- |
| POST   | `/goal/:email`     | Create a goal              |
| GET    | `/get-goal/:email` | Fetch all goals for a user |
| PATCH  | `/completed/:id`   | Update completed count     |
| DELETE | `/delete-goal/:id` | Delete a goal              |

### 💬 Quotes
| Method | Endpoint  | Description                   |
| ------ | --------- | ----------------------------- |
| GET    | `/quotes` | Get daily motivational quotes |

### 🧠 Tips
- Use Postman or Thunder Client for local API testing.
- On the frontend, always use withCredentials: true for authenticated API calls.

### 🤝 Contributing
- **Feel free to fork and contribute to this project! Here's how you can help:**

- 🔱 Fork the repository.
- 🔱 Create a new branch (git checkout -b feature-branch).
- 🔱 Commit your changes (git commit -am 'Add new feature').
- 🔱 Push to the branch (git push origin feature-branch).
- 🔱 Create a new pull request.


### 📬 Contact
- For any questions or suggestions, please contact me directly!

### 🚀 Happy Task Managing! with Achievo!

🚀 [Live Link](https://achievo-task-manager.netlify.app/)