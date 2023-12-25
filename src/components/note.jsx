import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { showFormattedDate } from '~/utils/date';

export function Note({ id, title, body, createdAt }) {
  return (
    <article className="relative space-y-2 rounded-md border p-4 hover:bg-muted">
      <header className="space-y-1.5">
        <h3 className="font-semibold">
          <Link
            to={id}
            className='after:absolute after:inset-0 after:content-[""]'
          >
            {title}
          </Link>
        </h3>
        <span className="inline-block rounded-full border bg-slate-200 px-3 py-1 text-xs  text-muted-foreground">
          {showFormattedDate(createdAt)}
        </span>
      </header>
      <p className="line-clamp-2 text-sm text-muted-foreground">{body}</p>
    </article>
  );
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
};
