import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { NoteService } from '~/lib/service';

export function useDeleteNote(id) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => NoteService.deleteById(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
      navigate('/');
    },
  });
}
