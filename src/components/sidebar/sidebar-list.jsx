import PropTypes from 'prop-types';

import { Icons } from '~/components/icons';
import { SidebarItem } from '~/components/sidebar';
import { useTranslation } from '~/hooks/use-translation';

export function SidebarList({ notes }) {
  const t = useTranslation();

  const items = [
    {
      title: t.NOTE.ALL.TITLE,
      icon: <Icons.Notes size={20} />,
      label: notes.filter((note) => !note.archived).length,
      link: '/n',
    },
    {
      title: t.NOTE.ARCHIVE.TITLE,
      icon: <Icons.Archive size={20} />,
      label: notes.filter((note) => note.archived).length,
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

SidebarList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      description: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
