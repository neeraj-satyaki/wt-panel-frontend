import {
  usersControllerGetAvatarByUserId,
  usersControllerGetUserWorkTime,
} from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const userProfileKey = 'user-profile'
const userTimesWorkKey = 'user-time-work'

export function useGetAvatarUser(userId: string) {
  return useQuery({
    queryKey: [userProfileKey, userId],
    queryFn: () => usersControllerGetAvatarByUserId({ userId }),
    retry: 0,
    staleTime: Infinity,
  })
}

export function useGetTimewWork(userId: string, startDate: string, endDate: string) {
  return useQuery({
    queryKey: [userTimesWorkKey, userId, startDate, endDate],
    queryFn: () =>
      usersControllerGetUserWorkTime({
        userId,
        startDate: startDate,
        endDate: endDate,
      }),
  })
}
