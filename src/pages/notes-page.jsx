import { Outlet } from 'react-router-dom';

export function NotesPage() {
  return (
    <>
      <div className="p-2">All notes page</div>
      <div className="p-2">
        <Outlet />
      </div>
    </>
  );
}
