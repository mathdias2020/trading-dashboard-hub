import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProducerCode from "./pages/auth/ProducerCode";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminDev from "./pages/admin/Dev";
import ProducerDashboard from "./pages/producer/Dashboard";
import ProducerSettings from "./pages/producer/Settings";
import ProducerSetup from "./pages/producer/Setup";
import ClientDashboard from "./pages/client/Dashboard";
import NoProducer from "./pages/client/NoProducer";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/producer-code", element: <ProducerCode /> },
    ],
  },
  {
    path: "/admin",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "dev", element: <AdminDev /> },
    ],
  },
  {
    path: "/producer",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "dashboard", element: <ProducerDashboard /> },
      { path: "settings", element: <ProducerSettings /> },
      { path: "setup", element: <ProducerSetup /> },
    ],
  },
  {
    path: "/client",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "dashboard", element: <ClientDashboard /> },
      { path: "no-producer", element: <NoProducer /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
