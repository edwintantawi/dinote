import React from 'react';

import PropTypes from 'prop-types';

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = React.useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
