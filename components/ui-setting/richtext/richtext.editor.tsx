import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import TextAlign from "@tiptap/extension-text-align";
import { Markdown } from "@tiptap/markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef } from "react";
import { EditorToolbar } from "./richtext.editor.toolbar";

interface EditorProps {
  name?: string;
  value: string;
  toolbar?: "hidden";
  disabled?: boolean;
  isInvalid?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

const RichTextEditor = forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      value,
      toolbar,
      onChange,
      className,
      disabled,
      isInvalid,
      ...editorProps
    },
    ref,
  ) => {
    const editor = useEditor({
      immediatelyRender: false,
      editable: !disabled,
      extensions: [
        StarterKit.configure({
          link: {
            openOnClick: false,
            autolink: true,
            defaultProtocol: "https",
          },
        }),
        Markdown,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ],
      content: value,
      contentType: "markdown",
      onUpdate: ({ editor }) => {
        onChange(editor.getMarkdown());
      },
    });

    if (!editor) return <Skeleton className="h-52 w-full" />;

    return (
      <div
        className={cn(
          "prose dark:prose-invert w-full max-w-none rounded-md border border-input bg-sidebar",
          disabled && "cursor-not-allowed opacity-50",
          isInvalid && "border-red-700",
          className,
        )}
      >
        <EditorToolbar editor={editor} className={toolbar ?? undefined} />
        <div className="richtext">
          <EditorContent ref={ref} editor={editor} {...editorProps} />
        </div>
      </div>
    );
  },
);

RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
