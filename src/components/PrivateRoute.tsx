import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface PrivateRouteProps {
  allowedRoles?: string[]; // optional: restrict by role
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Not authenticated</p>
      </div>
    );
  }
  

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Optionally check role
  if (allowedRoles && !allowedRoles.includes(authUser.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
