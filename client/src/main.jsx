import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from './store/authStore.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { AdminProvider } from "./store/adminStore.jsx";


createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <AdminProvider>
    <StrictMode>
      <App />
    </StrictMode>
    </AdminProvider>
  </AuthProvider>
);
