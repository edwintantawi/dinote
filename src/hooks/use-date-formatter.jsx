import { useLocale } from '~/hooks/use-locale';

export function useDateFormatter() {
  const { locale } = useLocale();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (date) => new Date(date).toLocaleDateString(locale, options);
}
