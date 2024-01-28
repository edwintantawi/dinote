import { useMutation, useQueryClient } from '@tanstack/react-query';

import { NoteService } from '~/lib/service';

export function useArchiveNote(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => NoteService.archiveById(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes', 'archived']);
    },
  });
}
