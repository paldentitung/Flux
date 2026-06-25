import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/AuthContext.tsx";
import { PostProvider } from "./features/posts/context/PostsContext.tsx";
import { NotificationsProvider } from "./features/notifications/contexts/NotificationsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotificationsProvider>
          <PostProvider>
            <App />
          </PostProvider>
        </NotificationsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
