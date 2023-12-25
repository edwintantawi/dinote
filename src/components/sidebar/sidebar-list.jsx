import { Icons } from '~/components/icons';
import { SidebarItem } from '~/components/sidebar';

const items = [
  {
    title: 'All Notes',
    icon: <Icons.Notes size={20} />,
    label: 30,
  },
  {
    title: 'Archive',
    icon: <Icons.Archive size={20} />,
    label: 2,
  },
];

export function SidebarList() {
  return (
    <nav className="h-[calc(100vh-64px)] w-full overflow-y-auto py-2 pr-2">
      <ul className="space-y-1">
        {items.map((item) => {
          return (
            <SidebarItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              label={item.label}
            />
          );
        })}
      </ul>
    </nav>
  );
}
