import { useAuth } from '~/hooks/use-auth';
import { TokenManager } from '~/lib/token-manager';

export function useLogout() {
  const { setAuth } = useAuth();
  return () => {
    TokenManager.clearToken();
    setAuth(null);
  };
}
