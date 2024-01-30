import { createBrowserRouter } from "react-router-dom";
import Settings from "../Components/Settings";
import App from "../App";
import Dashboard from "../Components/Dashboard";

const router = createBrowserRouter([
  { path: "/settings", element: <Settings /> },
  { path: "/", element: <App /> },
  { path: "/app", element: <App /> },
  {path: "/dashboard", element: <Dashboard />}
]);

export default router;
