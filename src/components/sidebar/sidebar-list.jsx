import { Icons } from '~/components/icons';
import { SidebarItem } from '~/components/sidebar';
import { useArchivedNotes } from '~/hooks/use-archived-notes';
import { useNotes } from '~/hooks/use-notes';
import { useTranslation } from '~/hooks/use-translation';

export function SidebarList() {
  const t = useTranslation();
  const { data: notes = [] } = useNotes();
  const { data: archivedNotes = [] } = useArchivedNotes();

  const items = [
    {
      title: t.NOTE.ALL.TITLE,
      icon: <Icons.Notes size={20} />,
      label: notes.length,
      link: '/n',
    },
    {
      title: t.NOTE.ARCHIVE.TITLE,
      icon: <Icons.Archive size={20} />,
      label: archivedNotes.length,
      link: '/archive',
    },
  ];

  return (
    <nav className="h-[calc(100vh-64px)] w-full overflow-y-auto py-2 pr-2">
      <ul className="space-y-1.5">
        {items.map((item) => {
          return (
            <SidebarItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              label={item.label}
              link={item.link}
            />
          );
        })}
      </ul>
    </nav>
  );
}
