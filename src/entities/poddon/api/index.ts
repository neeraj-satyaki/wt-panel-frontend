import { poddonsControllerGetOnePoddon } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const poddonKey = 'poddon'

export function useGetPoddon(id: string, page: string, count: string) {
  return useQuery({
    queryKey: [poddonKey, id, page],
    queryFn: () => poddonsControllerGetOnePoddon({ id, page, count }),
    staleTime: 5 * 60 * 1000,
  })
}
