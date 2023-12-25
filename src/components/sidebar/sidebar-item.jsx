import PropTypes from 'prop-types';

import { Button } from '~/components/ui/button';

export function SidebarItem({ icon, title, label }) {
  return (
    <li>
      <Button as="a" variant="ghost" className="w-full justify-between">
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
};
