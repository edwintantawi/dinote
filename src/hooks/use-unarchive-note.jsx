import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NoteService } from '~/lib/service';

export function useUnArchiveNote(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => NoteService.unarchiveById(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes', 'archived']);
    },
  });
}
