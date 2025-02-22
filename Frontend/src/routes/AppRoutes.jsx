import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ProtectedRouteWrapper from "./ProtectedRouteWrapper";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLogin from "../components/AdminLogin";
import AdminProtectedRoute from "./AdminProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRouteWrapper>
        <UserDashboard />
      </ProtectedRouteWrapper>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminProtectedRoute>
        <AdminDashboard />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
]);
const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
