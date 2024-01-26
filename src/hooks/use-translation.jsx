import * as React from 'react';

import { LocaleContext } from '~/contexts/locale-context';
import enUS from '~/i18n/en-US.json';
import idID from '~/i18n/id-ID.json';

export function useTranslation() {
  const context = React.useContext(LocaleContext);

  if (!context) {
    throw new Error('useTranslation must be used within a LocaleProvider');
  }

  const locales = {
    'en-US': enUS,
    'id-ID': idID,
  };

  return locales[context.locale];
}
