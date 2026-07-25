import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../api/client';

/** Blocks admin pages when no token is stored. Server still enforces auth. */
export default function ProtectedRoute() {
  return getToken() ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
