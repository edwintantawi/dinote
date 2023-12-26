import PropTypes from 'prop-types';
import { Outlet, useSearchParams } from 'react-router-dom';

import { Note } from '~/components/note';

export function NotesArchivePage({ notes }) {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '';
  const archivedNotes = notes
    .filter((note) => note.archived)
    .filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => -a.createdAt.localeCompare(b.createdAt));

  return (
    <>
      <div className="pl-2 pt-2">
        <ul className="h-[calc(100vh-64px)] space-y-2 overflow-y-auto pb-4 pr-2">
          {archivedNotes.map((note) => {
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

NotesArchivePage.propTypes = {
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
