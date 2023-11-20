import { applicationsControllerGetApplication } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const applicationKey = 'application'

export function useGetApplication(id: string) {
  return useQuery({
    queryKey: [`${applicationKey}-${id}`],
    queryFn: () => applicationsControllerGetApplication(id),
    staleTime: 5 * 60 * 1000,
  })
}
