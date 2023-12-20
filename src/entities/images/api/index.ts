import { imagesControllerGetStatustucsOfPhotos } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const statisticsOfPhotosKey = 'statistics-of-photos'

export function useGetStatisticsOfPhotos(year: number, month: number) {
  return useQuery({
    queryKey: [statisticsOfPhotosKey, year, month],
    queryFn: () =>
      imagesControllerGetStatustucsOfPhotos({
        year,
        month,
      }),
  })
}
