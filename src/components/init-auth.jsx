import PropTypes from 'prop-types';

import { Icons } from '~/components/icons';
import { useInitAuth } from '~/hooks/use-init-auth';

export function InitAuth({ children }) {
  const { isLoading } = useInitAuth();

  if (isLoading) {
    return (
      <div className="grid h-screen place-items-center bg-primary-foreground">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icons.Brand />
          <h1>Loading your note...</h1>
        </div>
      </div>
    );
  }

  return children;
}

InitAuth.propTypes = {
  children: PropTypes.node.isRequired,
};
