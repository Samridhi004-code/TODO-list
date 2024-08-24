import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import Logout from "../components/Auth/Logout";
import Register from "../components/Auth/Register";
import TaskList from "../components/Tasks/TaskList";
// Simulate authentication status
const isAuthenticated = !!localStorage.getItem('token');

const router = createBrowserRouter([
  {
    path: "/",
    element: isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: !isAuthenticated ? <Login /> : <Navigate to="/tasks" />,
  },
  {
    path: "/register",
    element: !isAuthenticated ? <Register /> : <Navigate to="/tasks" />,
  },
  {
    path: "/tasks",
    element: isAuthenticated ? <TaskList /> : <Navigate to="/login" />,
  },
]);
export {router};
