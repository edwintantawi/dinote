import { useQuery } from '@tanstack/react-query';

import { NoteService } from '~/lib/service';

export function useArchivedNotes() {
  return useQuery({
    queryKey: ['notes', 'archived'],
    queryFn: NoteService.getArchived,
  });
}
