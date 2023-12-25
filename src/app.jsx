import { Icons } from '~/components/icons';
import { SearchBar } from '~/components/search-bar';
import { SidebarList } from '~/components/sidebar';
import { Button } from '~/components/ui/button';

export function App() {
  return (
    <div className="container mx-auto grid h-screen overflow-hidden px-4">
      <header className="grid h-16 grid-cols-[auto,1fr] items-center gap-4 border-b py-2">
        <Button>
          <Icons.Brand size={20} />
          <span>Dinote</span>
        </Button>

        <SearchBar />
      </header>

      <main className="grid grid-cols-[260px,1fr,2fr]">
        <SidebarList />

        <div className="border-x p-2">list</div>
        <div className="p-2">content</div>
      </main>
    </div>
  );
}
