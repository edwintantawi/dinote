import { Outlet } from 'react-router-dom';

export function NotesLayout() {
  return (
    <div className="grid grid-cols-[1fr,2fr] divide-x">
      <Outlet />
    </div>
  );
}
