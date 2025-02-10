
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import ProducerDashboard from "./pages/producer/Dashboard";
import ProducerSettings from "./pages/producer/Settings";
import ClientDashboard from "./pages/client/Dashboard";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
    ],
  },
  {
    path: "/producer",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <ProducerDashboard /> },
      { path: "settings", element: <ProducerSettings /> },
    ],
  },
  {
    path: "/client",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <ClientDashboard /> },
    ],
  },
]);
