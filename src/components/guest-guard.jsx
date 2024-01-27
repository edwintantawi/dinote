import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '~/hooks/use-auth';

export function GuestGuard() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
