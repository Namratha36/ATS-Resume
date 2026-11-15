import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import AppLayout from "./features/layout/AppLayout";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Analyze from "./features/interview/pages/Analyze";
import Reports from "./features/interview/pages/Reports";
import ReportDetail from "./features/interview/pages/ReportDetail";
import Profile from "./features/profile/pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "analyze",
        element: <Analyze />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "reports/:id",
        element: <ReportDetail />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
