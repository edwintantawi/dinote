import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import { cn } from '~/utils/classname';
import { showFormattedDate } from '~/utils/date';

export function Note({ id, title, description, createdAt }) {
  const params = useParams();

  const isActive = params['note_id'] === id;

  return (
    <article
      className={cn('relative space-y-2 rounded-md border p-4 hover:bg-muted', {
        'bg-primary hover:bg-primary/95': isActive,
      })}
    >
      <header className="space-y-1.5">
        <h3
          className={cn('font-semibold', {
            'text-primary-foreground': isActive,
          })}
        >
          <Link
            to={{ pathname: id, search: window.location.search }}
            className='after:absolute after:inset-0 after:content-[""]'
          >
            {title}
          </Link>
        </h3>
        <span
          className={cn(
            'inline-block rounded-full border bg-slate-200 px-3 py-1 text-xs  text-muted-foreground',
            {
              'bg-slate-700 text-primary-foreground': isActive,
            }
          )}
        >
          {showFormattedDate(createdAt)}
        </span>
      </header>
      <p
        className={cn('line-clamp-2 text-sm text-muted-foreground', {
          'text-primary-foreground': isActive,
        })}
      >
        {description || '<no description>'}
      </p>
    </article>
  );
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
};
