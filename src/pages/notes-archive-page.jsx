import { Outlet } from 'react-router-dom';

export function NotesArchivePage() {
  return (
    <>
      <div className="p-2">Archive notes page</div>
      <div className="p-2">
        <Outlet />
      </div>
    </>
  );
}
