import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';

export function NotesLayout({ children }) {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('q') || '';

  return (
    <div>
      {searchQuery && (
        <div className="m-2 mb-0 rounded-md border bg-muted px-4 py-2">
          <p className="text-muted-foreground">
            <span className="font-semibold">Search note: </span>
            {searchQuery}
          </p>
        </div>
      )}
      <div className="grid grid-cols-[1fr,2fr] divide-x">{children}</div>
    </div>
  );
}

NotesLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
