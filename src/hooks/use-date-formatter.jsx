import * as React from 'react';

import { LocaleContext } from '~/contexts/locale-context';

export function useDateFormatter() {
  const context = React.useContext(LocaleContext);

  if (!context) {
    throw new Error('useDateFormatter must be used within a LocaleProvider');
  }

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (date) => new Date(date).toLocaleDateString(context.locale, options);
}
