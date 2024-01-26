import * as React from 'react';

import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { Icons } from '~/components/icons';
import { NotesLayout } from '~/components/notes-layout';
import { SearchBar } from '~/components/search-bar';
import { SidebarList } from '~/components/sidebar';
import { Button } from '~/components/ui/button';
import { ThemeContext } from '~/contexts/theme-context';
import { useTranslation } from '~/hooks/use-translation';
import { NotFoundPage } from '~/pages/not-found-page';
import { NoteAddPage } from '~/pages/note-add-page';
import { NoteDetailPage } from '~/pages/note-detail-page';
import { NoteEditPage } from '~/pages/note-edit-page';
import { NoteIndexPage } from '~/pages/note-index-page';
import { NotesArchivePage } from '~/pages/notes-archive-page';
import { NotesPage } from '~/pages/notes-page';
import { getAllNotes } from '~/utils/data';

export function App() {
  const t = useTranslation();
  const { theme, toggleTheme } = React.useContext(ThemeContext);
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
          return { ...note, archived: !note.archived };
        }
        return note;
      });

      setNotes(newNotes);
    };
  };

  const handleEdit = (editedNote) => {
    const newNotes = notes.map((note) => {
      if (note.id === editedNote.id) {
        return editedNote;
      }
      return note;
    });
    setNotes(newNotes);
    navigate(-1);
  };

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
          <Button as={Link} to="/n/new">
            <Icons.Plus size={20} />
            <span>{t.NOTE.CREATE}</span>
          </Button>
        </div>
      </header>

      <main className="grid grid-cols-[260px,1fr] items-start divide-x">
        <SidebarList notes={notes} />

        <Routes>
          <Route path="/" element={<NotesLayout />}>
            <Route index element={<Navigate to="/n" />} />
            <Route path="n" element={<NotesPage notes={notes} />}>
              <Route index element={<NoteIndexPage />} />
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
              <Route
                path=":note_id/edit"
                element={<NoteEditPage notes={notes} onEdit={handleEdit} />}
              />
              <Route path="new" element={<NoteAddPage onAdd={handleAdd} />} />
            </Route>
            <Route path="archive" element={<NotesArchivePage notes={notes} />}>
              <Route index element={<NoteIndexPage />} />
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
              <Route
                path=":note_id/edit"
                element={<NoteEditPage notes={notes} onEdit={handleEdit} />}
              />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <div className="h-full p-2">
                <NotFoundPage />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
