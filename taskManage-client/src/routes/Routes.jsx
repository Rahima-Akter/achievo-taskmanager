import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard.jsx";
import AddTaskForm from "../components/AddTaskForm";
import Home from "../components/Home";
import PrivateRoute from "../routes/PrivateRoute";
import UpdateTask from "../components/UpdateTask";
import NotFoundPage from "../components/NotFoundPage";
import LoginForm from "../components/signIn-signUp/LoginForm.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import AddGoalForm from "../components/AddGoalForm.jsx";
import axios from "axios";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "form",
    element: <LoginForm />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <DashboardLayout />,
      },
      {
        path: "create-task",
        element: (
          <PrivateRoute>
            <AddTaskForm />
          </PrivateRoute>
        ),
      },
      {
        path: "create-goal",
        element: (
          <PrivateRoute>
            <AddGoalForm />
          </PrivateRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <PrivateRoute>
            <UpdateTask />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          try {
            const response = await axios.get(
              `${import.meta.env.VITE_LOCAL_HOST}/task-by-id/${params.id}`
            );
            return response.data;
          } catch (error) {
            console.error("Loader error:", error);
            return null;
          }
        },
      },
    ],
  },
]);
