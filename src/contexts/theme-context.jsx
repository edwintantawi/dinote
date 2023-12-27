import * as React from 'react';

import PropTypes from 'prop-types';

export const ThemeContext = React.createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('theme') || 'light'
  );

  React.useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('class', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
