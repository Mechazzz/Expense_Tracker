import { createBrowserRouter } from "react-router-dom";
import Settings from "./Settings";
import App from "../App";

const router = createBrowserRouter([
  { path: "/settings", element: <Settings /> },
  { path: "/app", element: <App /> },
]);

export default router;
