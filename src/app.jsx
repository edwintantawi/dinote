import * as React from 'react';

import { Link, Navigate, Route, Routes } from 'react-router-dom';

import { Icons } from '~/components/icons';
import { NotesLayout } from '~/components/notes-layout';
import { SearchBar } from '~/components/search-bar';
import { SidebarList } from '~/components/sidebar';
import { Button } from '~/components/ui/button';
import { NoteDetailPage } from '~/pages/note-detail-page';
import { NotesArchivePage } from '~/pages/notes-archive-page';
import { NotesPage } from '~/pages/notes-page';
import { getAllNotes } from '~/utils/data';

export function App() {
  const [notes] = React.useState(getAllNotes());

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
        <SidebarList notes={notes} />

        <Routes>
          <Route path="/" element={<NotesLayout />}>
            <Route index element={<Navigate to="/all" />} />
            <Route path="all" element={<NotesPage notes={notes} />}>
              <Route index element={<p>index</p>} />
              <Route
                path=":note_id"
                element={<NoteDetailPage notes={notes} />}
              />
            </Route>
            <Route path="archive" element={<NotesArchivePage notes={notes} />}>
              <Route index element={<p>index</p>} />
              <Route
                path=":note_id"
                element={<NoteDetailPage notes={notes} />}
              />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}
