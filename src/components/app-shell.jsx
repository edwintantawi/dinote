import { Link, Outlet } from 'react-router-dom';

import { Icons } from '~/components/icons';
import { NotesLayout } from '~/components/notes-layout';
import { SearchBar } from '~/components/search-bar';
import { SidebarList } from '~/components/sidebar';
import { Button } from '~/components/ui/button';
import { LOCALE } from '~/constants/locale';
import { useLocale } from '~/hooks/use-locale';
import { useLogout } from '~/hooks/use-logout';
import { useTheme } from '~/hooks/use-theme';
import { useTranslation } from '~/hooks/use-translation';

export function AppShell() {
  const t = useTranslation();
  const { locale, toggleLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const logout = useLogout();

  return (
    <div className="mx-auto grid h-screen max-w-[1500px] grid-rows-[auto,1fr] overflow-hidden px-4">
      <header className="grid h-16 grid-cols-[auto,1fr,auto] items-center gap-4 border-b py-2">
        <Button as={Link} to="/">
          <Icons.Brand size={20} />
          <span>Dinote</span>
        </Button>

        <SearchBar />

        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <Icons.Light size={20} />
            ) : (
              <Icons.Dark size={20} />
            )}
            <span className="sr-only">Toogle theme</span>
          </Button>
          <Button variant="outline" size="icon" onClick={toggleLocale}>
            <span className="sr-only">Toogle language</span>
            <span className="font-mono">
              {locale === LOCALE.ID ? 'ID' : 'EN'}
            </span>
          </Button>
          <Button variant="destructive" onClick={logout}>
            <Icons.LogOut size={20} />
            <span>{t.AUTH.LOGOUT}</span>
          </Button>
          <Button as={Link} to="/n/new" className="w-44">
            <Icons.Plus size={20} />
            <span>{t.NOTE.CREATE}</span>
          </Button>
        </div>
      </header>

      <main className="grid grid-cols-[260px,1fr] items-start divide-x">
        <SidebarList />

        <NotesLayout>
          <Outlet />
        </NotesLayout>
      </main>
    </div>
  );
}
