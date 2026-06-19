import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { initializing, isAuthenticated } = useAuth();

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper text-sm font-semibold text-muted">
        Loading workspace...
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
