import { cn } from '@/lib/utils';
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  RedoIcon,
  Strikethrough,
  UnderlineIcon,
  UndoIcon,
} from 'lucide-react';
import { FormatExtension, LinkExtension } from './richtext.extensions';

import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { Editor } from '@tiptap/react';

export interface EditorToolbarProps {
  editor: Editor;
  className?: string;
}

export function EditorToolbar({ editor, className }: EditorToolbarProps) {
  return (
    <div
      className={cn(
        'bg-secondary/40 sticky inset-x-0 top-0 z-50 my-2 rounded-sm px-4 py-2 backdrop-blur-lg',
        'm-0 flex items-center justify-between p-2',
        className,
      )}
      aria-label="Formatting options"
    >
      <ToggleGroup className="flex flex-row items-center" type="multiple">
        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.isEditable ||
            !editor.can().chain().focus().toggleBold().run()
          }
          pressed={editor.isActive('bold')}
        >
          <BoldIcon className="size-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.isEditable ||
            !editor.can().chain().focus().toggleItalic().run()
          }
          pressed={editor.isActive('italic')}
          value="italic"
        >
          <ItalicIcon className="size-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          disabled={
            !editor.isEditable ||
            !editor.can().chain().focus().toggleUnderline().run()
          }
          pressed={editor.isActive('underline')}
        >
          <UnderlineIcon className="size-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.isEditable ||
            !editor.can().chain().focus().toggleStrike().run()
          }
          pressed={editor.isActive('strike')}
        >
          <Strikethrough className="size-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          disabled={
            !editor.isEditable ||
            !editor.can().chain().focus().toggleBulletList().run()
          }
          pressed={editor.isActive('bulletList')}
        >
          <ListIcon className="size-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          disabled={
            !editor.isEditable ||
            !editor.can().chain().focus().toggleOrderedList().run()
          }
          pressed={editor.isActive('orderedList')}
        >
          <ListOrderedIcon className="size-4" />
        </Toggle>

        {/* <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          disabled={
            !editor.isEditable ||
            !editor.can().chain().focus().toggleBlockquote().run()
          }
          pressed={editor.isActive('blockquote')}
        >
          <QuoteIcon className="size-4" />
        </Toggle> */}

        <LinkExtension editor={editor} />

        {/* <FormatExtension editor={editor} className="ml-2" /> */}
      </ToggleGroup>

      <ToggleGroup
        className="invisible flex flex-row items-center sm:visible"
        type="multiple"
      >
        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.isEditable || !editor.can().chain().focus().undo().run()
          }
        >
          <UndoIcon className="size-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.isEditable || !editor.can().chain().focus().redo().run()
          }
        >
          <RedoIcon className="size-4" />
        </Toggle>
      </ToggleGroup>
    </div>
  );
}
