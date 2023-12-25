import { Link, Navigate, Route, Routes } from 'react-router-dom';

import { Icons } from '~/components/icons';
import { NotesLayout } from '~/components/notes-layout';
import { SearchBar } from '~/components/search-bar';
import { SidebarList } from '~/components/sidebar';
import { Button } from '~/components/ui/button';
import { NoteDetailPage } from '~/pages/note-detail-page';
import { NotesArchivePage } from '~/pages/notes-archive-page';
import { NotesPage } from '~/pages/notes-page';

export function App() {
  return (
    <div className="container mx-auto grid h-screen overflow-hidden px-4">
      <header className="grid h-16 grid-cols-[auto,1fr] items-center gap-4 border-b py-2">
        <Button as={Link} to="/">
          <Icons.Brand size={20} />
          <span>Dinote</span>
        </Button>

        <SearchBar />
      </header>

      <main className="grid grid-cols-[260px,1fr] divide-x">
        <SidebarList />

        <Routes>
          <Route path="/" element={<NotesLayout />}>
            <Route index element={<Navigate to="/all" />} />
            <Route path="all" element={<NotesPage />}>
              <Route index element={<p>index</p>} />
              <Route path=":note_id" element={<NoteDetailPage />} />
            </Route>
            <Route path="archive" element={<NotesArchivePage />}>
              <Route index element={<p>index</p>} />
              <Route path=":note_id" element={<NoteDetailPage />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}
