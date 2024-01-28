import { Outlet, useSearchParams } from 'react-router-dom';

import { Note } from '~/components/note';
import { Skeleton } from '~/components/ui/skeleton';
import { useArchivedNotes } from '~/hooks/use-archived-notes';
import { useTranslation } from '~/hooks/use-translation';
import { cn } from '~/utils/classname';

export function NotesArchivePage() {
  const t = useTranslation();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '';

  const { data = [], isLoading } = useArchivedNotes();

  const archivedNotes = data
    .filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => -a.createdAt.localeCompare(b.createdAt));

  const isEmpty = archivedNotes.length === 0;

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
          {archivedNotes.map((note) => {
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

          {isLoading &&
            new Array(10).fill(0).map((_, index) => (
              <li key={index}>
                <Skeleton className="h-20" />
              </li>
            ))}

          {isEmpty && (
            <li className="px-6 py-4 text-center text-muted-foreground">
              &ldquo; {t.NOTE.ARCHIVE.EMPTY} &rdquo;
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
