import {
  timeControlControllerGetAvatarByUserId,
  timeControlControllerGetUserWorkTime,
} from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const userProfileKey = 'user-profile'
const userTimesWorkKey = 'user-profile'

export function useGetAvatarUser(userId: string) {
  return useQuery({
    queryKey: [userProfileKey, userId],
    queryFn: () => timeControlControllerGetAvatarByUserId({ userId }),
    retry: 0,
    staleTime: Infinity,
  })
}
export function useGetTimewWork(userId: string, startDate: string, endDate: string) {
  return useQuery({
    queryKey: [userTimesWorkKey, userId, startDate, endDate],
    queryFn: () =>
      timeControlControllerGetUserWorkTime({
        userId,
        startDate: startDate,
        endDate: endDate,
      }),
  })
}
