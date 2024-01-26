import { useLocale } from '~/hooks/use-locale';
import enUS from '~/i18n/en-US.json';
import idID from '~/i18n/id-ID.json';

export function useTranslation() {
  const { locale } = useLocale();

  const locales = {
    'en-US': enUS,
    'id-ID': idID,
  };

  return locales[locale];
}
