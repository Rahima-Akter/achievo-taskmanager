# 🌐 Achievo Client – Frontend for Task Management System

**Achievo Client** is the frontend interface of the **Achievo** system, built using **React**, **Vite**, and **Tailwind CSS**. It offers users a seamless experience for managing tasks and goals, authenticating securely via Firebase, and interacting with the backend API.

---

## 📋 Features

- ✅ **Task Management** – Create, read, update, and delete tasks
- 🔐 **Firebase Authentication** – Secure Google sign-in
- ⚡ **React** – Fast and component-based UI development
- 🌀 **React Query** – Efficient data fetching and caching
- 📦 **Axios** – Handles API requests to the backend
- 🎨 **Tailwind CSS** – Utility-first CSS for responsive design
- 🔁 **Drag-and-Drop** – Task reordering with `@hello-pangea/dnd`
- 🔔 **SweetAlert2** – Interactive alerts and confirmations
- 🚀 **Vite** – Lightning-fast dev server and bundler

---

## 🛠️ Technologies Used

- **React**
- **Vite**
- **Tailwind CSS**
- **Firebase**
- **React Query**
- **Axios**
- **SweetAlert2**
- **React Icons**
- **React Spinners**
- **@hello-pangea/dnd**
- **React Router**

---

## 📥 Installation Instructions

### 🖥️ Prerequisites

- ✅ Node.js installed: [Download here](https://nodejs.org/)
- ✅ Firebase project configured

---

### ⚙️ Steps to Get Started

1. **Clone the Repository**

```bash
git clone https://github.com/Rahima-Akter/achievo-taskmanager.git
cd achievo-client

```
2. **Install dependencies:**:
- Install all the required dependencies listed in the package.json file by running:

``` bash
npm install
```
3. **Set up Firebase:**:
- Create a .env file in the root of the project.

- 🟢 Add your Firebase configuration variables, such as:

- 🔱 VITE_FIREBASE_API_KEY=your-api-key
- 🔱 VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
- 🔱 VITE_FIREBASE_PROJECT_ID=your-project-id
- 🔱 VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
- 🔱 VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
- 🔱 VITE_FIREBASE_APP_ID=your-app-id
- 🔱 Start the development server:

4. **To start the server in development mode (with hot reloading), run:**:
```bash
npm run dev
```
- The application should now be running on http://localhost:5173.(or whichever port you have configured).

### 🌐 Pages and Routing
- The frontend consists of multiple pages and uses React Router for navigation:

- 🔱 Home: Displays the task list and task creation form.
- 🔱 Login: Allows users to authenticate via Firebase.
- 🔱 Dashboard – Overview of all user tasks
- 🔱 Not Found: A 404 page for non-existent routes.

### 🤝 Contributing
- Feel free to fork and contribute to this project! Here's how you can help:

- 🔱 Fork the repository.
- 🔱 Create a new branch (git checkout -b feature-branch).
- 🔱 Commit your changes (git commit -am 'Add new feature').
- 🔱 Push to the branch (git push origin feature-branch).
- 🔱 Create a new pull request.

### 📬 Contact
- For any questions or suggestions, please contact me directly!

### 🚀 Happy Task Managing with Achievo!

🚀 [Live Link](https://achievo-task-manager.netlify.app/)