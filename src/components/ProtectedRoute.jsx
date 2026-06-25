import { Navigate } from 'react-router-dom';
import Loading from './Loading.jsx';
import { useAuth } from '../context/useAuth.jsx';

export default function ProtectedRoute({ children, allowRoles }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowRoles && allowRoles.length > 0) {
    const role = profile?.role ?? 'Guest';
    if (!allowRoles.includes(role)) {
      return <Navigate to="/403" replace />;
    }
  }

  return children;
}
