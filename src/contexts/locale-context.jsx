import * as React from 'react';

import PropTypes from 'prop-types';

import { LOCALE } from '~/constants/locale';

export const LocaleContext = React.createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocale] = React.useState(
    localStorage.getItem('locale') || LOCALE.EN
  );

  React.useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const toggleLocale = () => {
    const newLocale = locale === LOCALE.EN ? LOCALE.ID : LOCALE.EN;
    setLocale(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
