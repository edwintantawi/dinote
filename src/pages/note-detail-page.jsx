import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { showFormattedDate } from '~/utils/date';

export function NoteDetailPage({ notes }) {
  const params = useParams();

  const note = notes.find((note) => note.id === params['note_id']);

  return (
    <article className="p-4">
      <header className="mb-4 space-y-2 border-b pb-4">
        <span className="inline-block rounded-full border bg-slate-200 px-3 py-1 text-xs  text-muted-foreground">
          {showFormattedDate(note.createdAt)}
        </span>
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
};
