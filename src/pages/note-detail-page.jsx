import { Link, useParams } from 'react-router-dom';

import { Editor } from '~/components/editor';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Skeleton } from '~/components/ui/skeleton';
import { useArchiveNote } from '~/hooks/use-archive-note';
import { useDateFormatter } from '~/hooks/use-date-formatter';
import { useDeleteNote } from '~/hooks/use-delete-note';
import { useNote } from '~/hooks/use-note';
import { useUnArchiveNote } from '~/hooks/use-unarchive-note';

export function NoteDetailPage() {
  const params = useParams();
  const formatDate = useDateFormatter();

  const noteId = params['note_id'];

  const { data: note = {}, isLoading } = useNote(noteId);
  const { mutate: deleteNote } = useDeleteNote(noteId);
  const { mutate: archiveNote } = useArchiveNote(noteId);
  const { mutate: unArchiveNote } = useUnArchiveNote(noteId);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex justify-between gap-2">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-8 w-28" />
        </div>
        <Skeleton className="mt-2 h-9" />

        <div className="mt-8 space-y-2">
          <Skeleton className="h-7" />
          <Skeleton className="h-7 w-5/6" />
          <Skeleton className="h-7 w-4/5" />
          <Skeleton className="h-7 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <article className="p-4">
      <header className="mb-4 space-y-2 border-b pb-4">
        <div className="flex items-center justify-between">
          <span className="inline-block rounded-full border bg-slate-200 px-3 py-1 text-xs text-muted-foreground">
            {formatDate(note.createdAt)}
          </span>
          <div className="flex gap-2">
            <Button
              as={Link}
              to={{ pathname: '', search: window.location.search }}
              size="icon"
              variant="outline"
              className="size-8 cursor-not-allowed opacity-50"
            >
              <Icons.Edit size={16} />
              <span className="sr-only">Edit note</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="size-8"
              onClick={note.archived ? unArchiveNote : archiveNote}
            >
              {note.archived ? (
                <Icons.UnArchive size={16} />
              ) : (
                <Icons.Archive size={16} />
              )}
              <span className="sr-only">Archive note</span>
            </Button>
            <Button
              size="icon"
              variant="destructive"
              className="size-8"
              onClick={deleteNote}
            >
              <Icons.Delete size={16} />
              <span className="sr-only">Delete note</span>
            </Button>
          </div>
        </div>

        <h1 className="text-3xl font-bold">{note.title}</h1>
      </header>

      <div key={note.id}>
        <Editor editable={false} content={note.body} />
      </div>
    </article>
  );
}
