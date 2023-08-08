import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
// Pages
import Login from "./pages/Login";
import NotFound from "./pages/Page404";
import DashboardApp from "./pages/DashboardApp";
import CommonSection from "./pages/CommonSection";
import { types } from "./controllers";

const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <LogoOnlyLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

const protectedRoutes = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      {
        path: "/dashboard",
        element: <DashboardApp />,
      },
      { path: "/events", element: <CommonSection type={types.EVENTS} /> },
      { path: "/gallery", element: <></> },
      {
        path: "/foodAndDrinks",
        element: <></>,
      },
      { path: "/faq", element: <CommonSection type={types.FAQ} /> },
      {
        path: "/cms",
        element: <></>,
      },
      {
        path: "/menu",
        element: <></>,
      },
      {
        path: "/venue",
        element: <></>,
      },
      {
        path: "/venueBooking",
        element: <></>,
      },
      {
        path: "/aboutUs",
        element: <></>,
      },
      {
        path: "/contactUs",
        element: <></>,
      },
      {
        path: "/subscribers",
        element: <></>,
      },
    ],
  },
  { path: "/", element: <Navigate to="/dashboard" /> },
  { path: "404", element: <NotFound /> },
  { path: "*", element: <Navigate to="/404" /> },
];

export default function Router() {
  const { authToken } = useSelector((state) => state.reducer);
  if (authToken) return useRoutes(protectedRoutes);
  return useRoutes(publicRoutes);
}
