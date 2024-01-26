import PropTypes from 'prop-types';
import { Outlet, useSearchParams } from 'react-router-dom';

import { Note } from '~/components/note';
import { useTranslation } from '~/hooks/use-translation';
import { cn } from '~/utils/classname';

export function NotesPage({ notes }) {
  const t = useTranslation();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '';
  const activeNotes = notes
    .filter((note) => !note.archived)
    .filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => -a.createdAt.localeCompare(b.createdAt));

  const isEmpty = activeNotes.length === 0;

  return (
    <>
      <div className="pl-2 pt-2">
        <ul
          className={cn(
            'h-[calc(100vh-64px)] space-y-2 overflow-y-auto pb-4 pr-2',
            {
              'h-[calc(100vh-114px)]': Boolean(searchQuery),
            }
          )}
        >
          {activeNotes.map((note) => {
            return (
              <li key={note.id}>
                <Note
                  id={note.id}
                  title={note.title}
                  description={note.description}
                  createdAt={note.createdAt}
                  archived={note.archived}
                />
              </li>
            );
          })}

          {isEmpty && (
            <li className="px-6 py-4 text-center text-muted-foreground">
              &ldquo; {t.NOTE.ALL.EMPTY} &rdquo;
            </li>
          )}
        </ul>
      </div>
      <div className="p-2 pb-4">
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
      description: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
