import * as React from 'react';

import { Editor } from '~/components/editor';
import { Button } from '~/components/ui/button';
import { useAddNote } from '~/hooks/use-add-note';
import { useTranslation } from '~/hooks/use-translation';

export function NoteAddPage() {
  const t = useTranslation();
  const [content, setContent] = React.useState('');

  const { mutate: addNote, isPending } = useAddNote();

  const handleChangeContent = (newContent) => {
    setContent(newContent);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const title = formData.get('title').trim();

    if (!title || !content) return;

    const newNote = {
      title,
      body: content,
    };

    addNote(newNote);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full p-4">
      <h1 className="sr-only">{t.NOTE.CREATE}</h1>

      <div className="flex h-full flex-col">
        <input
          autoFocus
          required
          name="title"
          placeholder={t.NOTE.FORM.TITLE}
          className="w-full bg-transparent pb-4 text-3xl font-bold outline-none"
        />
        <div className="grow border-y py-4">
          <Editor content={content} onChange={handleChangeContent} />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="destructive" type="reset" disabled={isPending}>
            {t.NOTE.FORM.CLEAR}
          </Button>
          <Button type="submit" disabled={isPending}>
            {t.NOTE.FORM.SAVE}
          </Button>
        </div>
      </div>
    </form>
  );
}
