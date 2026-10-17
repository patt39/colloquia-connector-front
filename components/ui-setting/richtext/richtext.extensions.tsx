import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Link, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { EditorToolbarProps } from './richtext.editor.toolbar';

export function LinkExtension({ editor, className }: EditorToolbarProps) {
  const [isOpen, setOpen] = useState(false);

  const [href, setHref] = useState('');
  const [target, setTarget] = useState('_self');

  const toggleAndSet = (open: boolean) => {
    if (open) {
      setHref(editor.getAttributes('link').href || '');
      setTarget(editor.getAttributes('link').target || '_self');
    } else {
      setHref('');
      setTarget('_self');
    }
    setOpen(open);
  };

  const setLink = () => {
    if (href === null) {
      setOpen(false);
      return;
    }

    if (href === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      setOpen(false);
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href, target })
      .run();

    setOpen(false);
  };

  const removeLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();

    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleAndSet}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          disabled={
            !editor.isEditable ||
            !editor.can().chain().focus().extendMarkRange('link').run()
          }
          className={cn(
            'hover:bg-muted hover:text-muted-foreground px-2.5',
            editor.isActive('link') && 'bg-accent text-accent-foreground',
            className,
          )}
        >
          <Link className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-87.5">
        <DialogHeader>
          <DialogTitle className="mb-4">
            {!editor.isActive('link') ? 'Aggiungi link' : 'Aggiorna link'}
          </DialogTitle>
          <DialogDescription>
            Inserisci il link e scegli dove aprirlo.
          </DialogDescription>
          <Label>Link*</Label>
          <Input value={href} onChange={(e) => setHref(e.target.value)} />
          <Label>Target*</Label>
          <Select value={target} onValueChange={setTarget}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="_self">Stessa tab</SelectItem>
                <SelectItem value="_blank">Nuova tab</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="mt-6! self-end">
            <Button size="sm" variant="secondary" onClick={setLink}>
              {!editor.isActive('link') ? 'Aggiungi' : 'Aggiorna'}
              <Link className="ml-2 size-4" />
            </Button>
            {editor.isActive('link') && (
              <Button
                size="sm"
                variant="secondary"
                onClick={removeLink}
                className="ml-2"
              >
                Rimuovi
                <Trash2 className="ml-2 size-4" />
              </Button>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export function FormatExtension({ editor, className }: EditorToolbarProps) {
  const value = () => {
    if (editor.isActive('paragraph')) return 'paragraph';
    if (editor.isActive('heading', { level: 1 })) return 'h1';
    if (editor.isActive('heading', { level: 2 })) return 'h2';
    if (editor.isActive('heading', { level: 3 })) return 'h3';
    if (editor.isActive('heading', { level: 4 })) return 'h4';
    if (editor.isActive('heading', { level: 5 })) return 'h5';
    if (editor.isActive('heading', { level: 6 })) return 'h6';
  };

  const onChange = (value: string) => {
    switch (value) {
      case 'paragraph':
        editor.chain().focus().setNode('paragraph').run();
        break;
      case 'h1':
        editor
          .chain()
          .focus()
          .toggleNode('heading', 'paragraph', { level: 1 })
          .run();
        break;
      case 'h2':
        editor
          .chain()
          .focus()
          .toggleNode('heading', 'paragraph', { level: 2 })
          .run();
        break;
      case 'h3':
        editor
          .chain()
          .focus()
          .toggleNode('heading', 'paragraph', { level: 3 })
          .run();
        break;
      case 'h4':
        editor
          .chain()
          .focus()
          .toggleNode('heading', 'paragraph', { level: 4 })
          .run();
        break;
      case 'h5':
        editor
          .chain()
          .focus()
          .toggleNode('heading', 'paragraph', { level: 5 })
          .run();
        break;
      case 'h6':
        editor
          .chain()
          .focus()
          .toggleNode('heading', 'paragraph', { level: 6 })
          .run();
        break;
    }
  };

  return (
    <Select
      onValueChange={onChange}
      defaultValue={value()}
      disabled={!editor.isEditable}
      value={value()}
    >
      <SelectTrigger className={cn('w-auto', className)}>
        <SelectValue placeholder="Seleziona formato" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="paragraph">Paragrafo</SelectItem>
          <SelectItem value="h1">H1</SelectItem>
          <SelectItem value="h2">H2</SelectItem>
          <SelectItem value="h3">H3</SelectItem>
          <SelectItem value="h4">H4</SelectItem>
          <SelectItem value="h5">H5</SelectItem>
          <SelectItem value="h6">H6</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
