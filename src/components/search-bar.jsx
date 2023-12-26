import * as React from 'react';

import { useNavigate } from 'react-router-dom';

import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { cn } from '~/utils/classname';

export function SearchBar() {
  const inputRef = React.useRef(null);
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();

  const isEmptyQuery = query === '';

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (inputRef.current === null) return;

      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        inputRef.current.focus();
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        inputRef.current.blur();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChangeQuery = (event) => {
    setQuery(event.currentTarget.value);
  };

  const handleClearSearch = () => {
    setQuery('');
    navigate({ search: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!query) return;

    inputRef.current?.blur();
    navigate({ search: `q=${query}` });
  };

  return (
    <form className="relative w-full" onSubmit={handleSubmit}>
      <Icons.Search
        size={20}
        className="absolute bottom-1/2 left-3 translate-y-1/2 text-slate-400"
      />
      <Input
        ref={inputRef}
        className={cn('h-10 truncate px-11', {
          'pr-14': isEmptyQuery,
        })}
        placeholder="Explore subjects & topics"
        value={query}
        onChange={handleChangeQuery}
      />

      <div className="absolute bottom-1/2 right-1.5 grid translate-y-1/2 place-items-center">
        {isEmptyQuery ? (
          <kbd className="pointer-events-none flex h-7 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium">
            <Icons.Command size={10} />
            <span className="-mb-0.5 leading-none">k</span>
          </kbd>
        ) : (
          <Button
            type="reset"
            variant="secondary"
            className="h-7 w-7 border p-1"
            onClick={handleClearSearch}
          >
            <Icons.Cancel size={16} />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </form>
  );
}
