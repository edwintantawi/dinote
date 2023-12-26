import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { showFormattedDate } from '~/utils/date';

export function NoteDetailPage({ notes, onDelete, onArchive }) {
  const params = useParams();

  const note = notes.find((note) => note.id === params['note_id']);

  return (
    <article className="p-4">
      <header className="mb-4 space-y-2 border-b pb-4">
        <div className="flex items-center justify-between">
          <span className="inline-block rounded-full border bg-slate-200 px-3 py-1 text-xs  text-muted-foreground">
            {showFormattedDate(note.createdAt)}
          </span>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              className="size-8"
              onClick={onArchive(note.id)}
            >
              <Icons.Archive size={16} />
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
      </header>

      <p className="text-lg text-muted-foreground">{note.body}</p>
    </article>
  );
}

NoteDetailPage.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};
