import Placeholder from '@tiptap/extension-placeholder';
import {
  BubbleMenu,
  EditorProvider,
  FloatingMenu,
  useCurrentEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import PropTypes from 'prop-types';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { useTranslation } from '~/hooks/use-translation';

function MenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-1 rounded-md border bg-muted p-1">
      <Button
        type="button"
        variant={
          editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'
        }
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Icons.Heading2 size={16} />
        <span className="sr-only">Heading 2</span>
      </Button>
      <Button
        type="button"
        variant={
          editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'
        }
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Icons.Heading3 size={16} />
        <span className="sr-only">Heading 3</span>
      </Button>
      <Button
        type="button"
        variant={editor.isActive('bold') ? 'default' : 'outline'}
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <Icons.Bold size={16} />
        <span className="sr-only">Bold</span>
      </Button>
      <Button
        type="button"
        variant={editor.isActive('italic') ? 'default' : 'outline'}
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <Icons.Italic size={16} />
        <span className="sr-only">Italic</span>
      </Button>
      <Button
        type="button"
        variant={editor.isActive('strike') ? 'default' : 'outline'}
        size="icon"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <Icons.Strike size={16} />
        <span className="sr-only">Strike</span>
      </Button>
      <Button
        type="button"
        variant={editor.isActive('code') ? 'default' : 'outline'}
        size="icon"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
      >
        <Icons.Code size={16} />
        <span className="sr-only">Code</span>
      </Button>
      <Button
        type="button"
        variant={editor.isActive('paragraph') ? 'default' : 'outline'}
        size="icon"
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <Icons.Paragraph size={16} />
        <span className="sr-only">Paragraph</span>
      </Button>
      <Button
        type="button"
        variant={editor.isActive('bulletList') ? 'default' : 'outline'}
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <Icons.BulletList size={16} />
        <span className="sr-only">Bullet list</span>
      </Button>
      <Button
        type="button"
        variant={editor.isActive('orderedList') ? 'default' : 'outline'}
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <Icons.OrderedList size={16} />
        <span className="sr-only">Ordered list</span>
      </Button>
      <Button
        type="button"
        variant={editor.isActive('blockquote') ? 'default' : 'outline'}
        size="icon"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Icons.Blockquote size={16} />
        <span className="sr-only">Blockquote</span>
      </Button>
    </div>
  );
}

export function Editor({ onChange, content, editable = true }) {
  const t = useTranslation();

  const extensions = [
    StarterKit,
    Placeholder.configure({
      placeholder: t.NOTE.FORM.BODY,
      emptyEditorClass:
        'cursor-text before:content-[attr(data-placeholder)] before:absolute top-0 before:text-slate-300 before-pointer-events-none',
    }),
  ];
  return (
    <EditorProvider
      extensions={extensions}
      content={content}
      editable={editable}
      editorProps={{
        attributes: {
          class:
            'prose prose-md focus:outline-none max-w-none max-h-[calc(100vh-260px)] overflow-y-auto dark:text-white',
        },
      }}
      onUpdate={({ editor }) => {
        onChange(editor.getHTML());
      }}
    >
      <BubbleMenu className="w-fit">
        <MenuBar />
      </BubbleMenu>
      <FloatingMenu className="w-fit">
        <MenuBar />
      </FloatingMenu>
    </EditorProvider>
  );
}

Editor.propTypes = {
  onChange: PropTypes.func,
  content: PropTypes.string,
  editable: PropTypes.bool,
};
