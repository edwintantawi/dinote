import { useQuery } from '@tanstack/react-query';

import { NoteService } from '~/lib/service';

export function useNotes() {
  return useQuery({
    queryKey: ['notes'],
    queryFn: NoteService.getActive,
  });
}
