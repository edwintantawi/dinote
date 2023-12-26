import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Button } from '~/components/ui/button';

export function NoteAddPage({ addNote }) {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const title = formData.get('title').trim();
    const body = formData.get('body').trim();

    if (!title || !body) return;

    const id = String(+new Date());
    const createdAt = new Date().toISOString();

    const newNote = {
      id,
      title,
      body,
      createdAt,
      archived: false,
    };

    addNote(newNote);
    navigate(`/n/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full p-4">
      <h1 className="sr-only">Create new note</h1>

      <div className="flex h-full flex-col">
        <input
          autoFocus
          required
          name="title"
          placeholder="Note title..."
          className="w-full pb-4 text-3xl font-bold outline-none"
        />
        <textarea
          required
          name="body"
          placeholder="Start write your note..."
          className="w-full grow border-y py-2 outline-none"
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="destructive" type="reset">
            Clear
          </Button>
          <Button type="submit">Save note</Button>
        </div>
      </div>
    </form>
  );
}

NoteAddPage.propTypes = {
  addNote: PropTypes.func.isRequired,
};
