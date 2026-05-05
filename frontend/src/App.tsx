import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyOtpPage from "./pages/VerifyOtpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import NotificationPage from "./pages/NotificationPage";
import SettingPage from "./pages/SettingPage";
import MessagePage from "./pages/MessagePage";
const App = () => {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "hsl(240 14% 12%)",
            color: "hsl(40 10% 94%)",
            border: "1px solid hsl(240 12% 18%)",
            borderRadius: "0.875rem",
            fontSize: "0.875rem",
            boxShadow: "0 8px 40px rgba(0, 0, 0, 0.6)",
          },
          success: {
            iconTheme: {
              primary: "hsl(142 71% 45%)",
              secondary: "hsl(240 14% 12%)",
            },
          },
          error: {
            iconTheme: {
              primary: "hsl(0 75% 60%)",
              secondary: "hsl(240 14% 12%)",
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/explore"
            element={
              <MainLayout contentMax="wide">
                <ExplorePage />
              </MainLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <MainLayout contentMax="wide">
                <NotificationPage />
              </MainLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <MainLayout contentMax="wide">
                <SettingPage />
              </MainLayout>
            }
          />
          <Route
            path="/messages"
            element={
              <MainLayout contentMax="wide">
                <MessagePage />
              </MainLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
