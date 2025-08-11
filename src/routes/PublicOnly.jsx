import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicOnlyRoute = ({ children }) => {
  const { user } = useAuth();
  
  // If user is logged in, send them to /home
  if (user) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
};

export default PublicOnlyRoute;
