import { useParams } from 'react-router-dom';

export function NoteDetailPage() {
  const params = useParams();

  return <div>Detail of note: {params['note_id']}</div>;
}
