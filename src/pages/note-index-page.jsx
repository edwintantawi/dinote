import { Icons } from '~/components/icons';
import { useTranslation } from '~/hooks/use-translation';

export function NoteIndexPage() {
  const t = useTranslation();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 rounded-md border bg-muted p-8 text-muted-foreground">
      <Icons.Combine size={60} />
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t.NOTE.DETAIL.EMPTY.TITLE}</h1>
        <p>{t.NOTE.DETAIL.EMPTY.DESCRIPTION}</p>
      </div>
    </div>
  );
}
