import * as React from 'react';

import { useQuery } from '@tanstack/react-query';

import { useAuth } from '~/hooks/use-auth';
import { UserService } from '~/lib/service';

export function useInitAuth() {
  const { setAuth } = useAuth();
  const [initialize, setInitialize] = React.useState(true);
  const query = useQuery({
    queryKey: ['auth'],
    queryFn: UserService.getProfile,
    retry: false,
  });

  React.useEffect(() => {
    if (query.data) {
      setAuth(query.data);
      setInitialize(false);
    }
  }, [query.data, setAuth]);

  return {
    ...query,
    isLoading: query.isLoading || initialize,
  };
}
