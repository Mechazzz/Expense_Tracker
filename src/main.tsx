import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Index.tsx";
import SettingsProvider from "./Providers/SettingsProvider.tsx";
import Layout from "./Components/Layout.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </SettingsProvider>
  </React.StrictMode>
);
