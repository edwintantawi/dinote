import { Outlet, useSearchParams } from 'react-router-dom';

import { Note } from '~/components/note';
import { Skeleton } from '~/components/ui/skeleton';
import { useNotes } from '~/hooks/use-notes';
import { useTranslation } from '~/hooks/use-translation';
import { cn } from '~/utils/classname';

export function NotesPage() {
  const t = useTranslation();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '';

  const { data = [], isLoading } = useNotes({
    search: searchQuery,
  });

  const notes = data
    .filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => -a.createdAt.localeCompare(b.createdAt));

  const isEmpty = !isLoading && notes.length === 0;

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
          {notes.map((note) => {
            return (
              <li key={note.id}>
                <Note
                  id={note.id}
                  title={note.title}
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
