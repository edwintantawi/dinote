import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { AuthenticationService } from '~/lib/service';

export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: AuthenticationService.register,
    onSuccess: () => navigate('/login'),
  });
}
