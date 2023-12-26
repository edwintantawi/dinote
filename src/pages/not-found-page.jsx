import { Link } from 'react-router-dom';

import { Button } from '~/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="h-full pb-4">
      <div className="m-2 grid h-full place-items-center rounded-md border bg-muted">
        <div className="text-center">
          <span className="text-3xl font-bold text-muted-foreground">404</span>
          <h1 className="text-2xl font-bold">Not Found</h1>
          <p className="mb-4 max-w-64 text-sm text-muted-foreground">
            It looks like you are lost because this page doesn&apos;t exist
          </p>
          <Button as={Link} to="/">
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}
