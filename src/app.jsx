import { Navigate, Route, Routes } from 'react-router-dom';

import { AppShell } from '~/components/app-shell';
import { AuthGuard } from '~/components/auth-guard';
import { GuestGuard } from '~/components/guest-guard';
import { LoginPage } from '~/pages/login-page';
import { NotFoundPage } from '~/pages/not-found-page';
import { NoteAddPage } from '~/pages/note-add-page';
import { NoteDetailPage } from '~/pages/note-detail-page';
import { NoteEditPage } from '~/pages/note-edit-page';
import { NoteIndexPage } from '~/pages/note-index-page';
import { NotesArchivePage } from '~/pages/notes-archive-page';
import { NotesPage } from '~/pages/notes-page';
import { RegisterPage } from '~/pages/register-page';

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <AppShell />
          </AuthGuard>
        }
      >
        <Route index element={<Navigate to="/n" />} />
        <Route path="n" element={<NotesPage notes={[]} />}>
          <Route index element={<NoteIndexPage />} />
          <Route
            path=":note_id"
            element={
              <NoteDetailPage
                notes={[]}
                onDelete={() => {}}
                onArchive={() => {}}
              />
            }
          />
          <Route
            path=":note_id/edit"
            element={<NoteEditPage notes={[]} onEdit={() => {}} />}
          />
          <Route path="new" element={<NoteAddPage onAdd={() => {}} />} />
        </Route>
        <Route path="archive" element={<NotesArchivePage notes={[]} />}>
          <Route index element={<NoteIndexPage />} />
          <Route
            path=":note_id"
            element={
              <NoteDetailPage
                notes={[]}
                onDelete={() => {}}
                onArchive={() => {}}
              />
            }
          />
          <Route
            path=":note_id/edit"
            element={<NoteEditPage notes={[]} onEdit={() => {}} />}
          />
        </Route>
      </Route>

      <Route element={<GuestGuard />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
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
  );
}
