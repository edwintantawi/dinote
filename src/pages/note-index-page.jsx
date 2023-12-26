import { Icons } from '~/components/icons';

export function NoteIndexPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-md border bg-muted p-8 text-muted-foreground">
      <Icons.Combine size={60} />
      <div className="text-center">
        <h1 className="text-2xl font-bold">There is no selected note</h1>
        <p>Please select one of the notes to view</p>
      </div>
    </div>
  );
}
