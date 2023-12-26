import * as React from 'react';

import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { Icons } from '~/components/icons';
import { NotesLayout } from '~/components/notes-layout';
import { SearchBar } from '~/components/search-bar';
import { SidebarList } from '~/components/sidebar';
import { Button } from '~/components/ui/button';
import { NoteAddPage } from '~/pages/note-add-page';
import { NoteDetailPage } from '~/pages/note-detail-page';
import { NotesArchivePage } from '~/pages/notes-archive-page';
import { NotesPage } from '~/pages/notes-page';
import { getAllNotes } from '~/utils/data';

export function App() {
  const navigate = useNavigate();
  const [notes, setNotes] = React.useState(getAllNotes());

  const handleAdd = (newNote) => {
    setNotes([...notes, newNote]);
    navigate(`/n/${newNote.id}`);
  };

  const handleDelete = (noteId) => {
    return () => {
      setNotes(notes.filter((note) => note.id !== noteId));
      navigate('/');
    };
  };

  const handleArchive = (noteId) => {
    return () => {
      const newNotes = notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, archived: true };
        }
        return note;
      });

      setNotes(newNotes);
      navigate(`/archive/${noteId}`);
    };
  };

  return (
    <div className="container mx-auto grid h-screen overflow-hidden px-4">
      <header className="grid h-16 grid-cols-[auto,1fr,auto] items-center gap-4 border-b py-2">
        <Button as={Link} to="/">
          <Icons.Brand size={20} />
          <span>Dinote</span>
        </Button>

        <SearchBar />

        <Button as={Link} to="/n/new">
          <Icons.Plus size={20} />
          <span>Create new note</span>
        </Button>
      </header>

      <main className="grid grid-cols-[260px,1fr] divide-x">
        <SidebarList notes={notes} />

        <Routes>
          <Route path="/" element={<NotesLayout />}>
            <Route index element={<Navigate to="/n" />} />
            <Route path="n" element={<NotesPage notes={notes} />}>
              <Route index element={<p>index</p>} />
              <Route
                path=":note_id"
                element={
                  <NoteDetailPage
                    notes={notes}
                    onDelete={handleDelete}
                    onArchive={handleArchive}
                  />
                }
              />
              <Route path="new" element={<NoteAddPage onAdd={handleAdd} />} />
            </Route>
            <Route path="archive" element={<NotesArchivePage notes={notes} />}>
              <Route index element={<p>index</p>} />
              <Route
                path=":note_id"
                element={
                  <NoteDetailPage
                    notes={notes}
                    onDelete={handleDelete}
                    onArchive={handleArchive}
                  />
                }
              />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}
