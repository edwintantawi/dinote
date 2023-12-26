import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import { Note } from '~/components/note';

export function NotesPage({ notes }) {
  const activeNotes = notes.filter((note) => !note.archived);

  return (
    <>
      <div className="pl-2 pt-2">
        <ul className="h-[calc(100vh-64px)] space-y-2 overflow-y-auto pb-4 pr-2">
          {activeNotes.map((note) => {
            return (
              <li key={note.id}>
                <Note
                  id={note.id}
                  title={note.title}
                  body={note.body}
                  createdAt={note.createdAt}
                  archived={note.archived}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="p-2">
        <Outlet />
      </div>
    </>
  );
}

NotesPage.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
