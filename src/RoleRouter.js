import { Navigate } from "react-router-dom";

function RoleRouter({ children, allowedRole }) {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RoleRouter;
