import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '~/components/ui/button';

export function SidebarItem({ icon, title, label, link }) {
  const location = useLocation();

  const isActive = location.pathname.startsWith(link);

  return (
    <li>
      <Button
        as={Link}
        to={link}
        variant={isActive ? 'default' : 'ghost'}
        className="w-full justify-between"
      >
        <div className="flex items-center gap-3">
          {icon}
          {title}
        </div>

        <span>{label}</span>
      </Button>
    </li>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.node,
  link: PropTypes.string,
};
