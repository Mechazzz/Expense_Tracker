import { createBrowserRouter } from "react-router-dom";
import Settings from "../Components/Settings";
import App from "../App";

const router = createBrowserRouter([
  { path: "/settings", element: <Settings /> },
  { path: "/", element: <App /> },
  { path: "/app", element: <App /> },
]);

export default router;
