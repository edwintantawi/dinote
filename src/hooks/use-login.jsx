import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '~/hooks/use-auth';
import { AuthenticationService } from '~/lib/service';
import { TokenManager } from '~/lib/token-manager';

export function useLogin() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  return useMutation({
    mutationFn: AuthenticationService.login,
    onSuccess: ({ data }) => {
      TokenManager.storeToken({ access_token: data.accessToken });
      setAuth(data);
      navigate('/n');
    },
  });
}
