import * as React from 'react';

import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import { Editor } from '~/components/editor';
import { Button } from '~/components/ui/button';

export function NoteEditPage({ notes, onEdit }) {
  const params = useParams();

  const note = notes.find((note) => note.id === params['note_id']);

  const [content, setContent] = React.useState(note.body);

  const handleChangeContent = (newContent) => {
    setContent(newContent);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();

    if (!title || !content) return;

    const editedNote = {
      title,
      id: note.id,
      body: content,
      description,
      createdAt: note.createdAt,
      archived: note.archived,
    };

    onEdit(editedNote);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full p-4">
      <h1 className="sr-only">Edit note</h1>

      <div className="flex h-full flex-col">
        <input
          autoFocus
          required
          name="title"
          placeholder="Note title..."
          className="w-full pb-2 text-3xl font-bold outline-none"
          defaultValue={note.title}
        />
        <textarea
          name="description"
          rows={1}
          placeholder="Description..."
          className="w-full pb-4 outline-none"
          defaultValue={note.description}
        />
        <div className="grow border-y py-4">
          <Editor content={content} onChange={handleChangeContent} />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="destructive" type="reset" as={Link} to={-1}>
            Cancel
          </Button>
          <Button type="submit">Save note</Button>
        </div>
      </div>
    </form>
  );
}

NoteEditPage.propTypes = {
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
  onEdit: PropTypes.func.isRequired,
};
