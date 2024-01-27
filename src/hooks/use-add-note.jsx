import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { NoteService } from '~/lib/service';

export function useAddNote() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: NoteService.add,
    onSuccess: (data) => {
      navigate(`/n/${data.id}`);
      queryClient.invalidateQueries(['notes']);
    },
  });
}
