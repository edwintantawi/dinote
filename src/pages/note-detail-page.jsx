import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import { Editor } from '~/components/editor';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { useDateFormatter } from '~/hooks/use-date-formatter';
import { NotFoundPage } from '~/pages/not-found-page';

export function NoteDetailPage({ notes, onDelete, onArchive }) {
  const params = useParams();
  const formatDate = useDateFormatter();

  const note = notes.find((note) => note.id === params['note_id']);

  if (note === undefined) {
    return <NotFoundPage />;
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
              to={{ pathname: 'edit', search: window.location.search }}
              size="icon"
              variant="outline"
              className="size-8"
            >
              <Icons.Edit size={16} />
              <span className="sr-only">Edit note</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="size-8"
              onClick={onArchive(note.id)}
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
              onClick={onDelete(note.id)}
            >
              <Icons.Delete size={16} />
              <span className="sr-only">Delete note</span>
            </Button>
          </div>
        </div>

        <h1 className="text-3xl font-bold">{note.title}</h1>
        <p className="text-muted-foreground">
          {note.description || '<no description>'}
        </p>
      </header>

      <div key={note.id}>
        <Editor editable={false} content={note.body} />
      </div>
    </article>
  );
}

NoteDetailPage.propTypes = {
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
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};
