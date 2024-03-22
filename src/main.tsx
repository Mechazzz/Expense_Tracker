import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Index.tsx";
import SettingsProvider from "./Providers/SettingsProvider.tsx";
import Layout from "./Components/Layout.tsx";
import MessageProvider from "./Providers/Messageprovider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsProvider>
      <MessageProvider>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </MessageProvider>
    </SettingsProvider>
  </React.StrictMode>
);
