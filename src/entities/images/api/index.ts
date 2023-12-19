import { imagesControllerGetStatustucsOfPhotos } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const statisticsOfPhotosKey = 'statistics-of-photos'

export function useGetStatisticsOfPhotos(year: number, month: number) {
  const query = useQuery({
    queryKey: [statisticsOfPhotosKey, year, month],
    queryFn: () =>
      imagesControllerGetStatustucsOfPhotos({
        year,
        month,
      }),
  })

  return query
}
