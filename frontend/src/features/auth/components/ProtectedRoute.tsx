import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
};
export default ProtectedRoute;
