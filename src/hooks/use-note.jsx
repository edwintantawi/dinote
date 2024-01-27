import { useQuery } from '@tanstack/react-query';

import { NoteService } from '~/lib/service';

export function useNote(id) {
  return useQuery({
    queryKey: ['notes', id],
    queryFn: () => NoteService.getById(id),
  });
}
