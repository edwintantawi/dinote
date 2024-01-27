import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useAuth } from '~/hooks/use-auth';

export function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
