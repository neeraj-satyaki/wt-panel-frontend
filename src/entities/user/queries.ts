import { timeControlControllerGetAvatarByUserId } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const userProfileKey = 'user-profile'

export function useGetAvatarUser(userId: string) {
  return useQuery({
    queryKey: [userProfileKey, userId],
    queryFn: () => timeControlControllerGetAvatarByUserId({ userId }),
    retry: 0,
    staleTime: Infinity,
  })
}
