import * as React from 'react';

import PropTypes from 'prop-types';

import { Editor } from '~/components/editor';
import { Button } from '~/components/ui/button';

export function NoteAddPage({ onAdd }) {
  const [content, setContent] = React.useState('');

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

    const id = String(+new Date());
    const createdAt = new Date().toISOString();

    const newNote = {
      id,
      title,
      body: content,
      description,
      createdAt,
      archived: false,
    };

    onAdd(newNote);
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
          className="w-full pb-2 text-3xl font-bold outline-none"
        />
        <textarea
          name="description"
          rows={1}
          placeholder="Description..."
          className="w-full pb-4 outline-none"
        />
        <div className="grow border-y py-4">
          <Editor content={content} onChange={handleChangeContent} />
        </div>
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
  onAdd: PropTypes.func.isRequired,
};
