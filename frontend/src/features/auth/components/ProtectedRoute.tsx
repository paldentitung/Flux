import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../../shared/components/ui/Logo";
const ProtectedRoute = () => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center flex-col gap-4">
        <Logo />
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
};

export default ProtectedRoute;
