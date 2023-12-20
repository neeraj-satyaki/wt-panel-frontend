import {
  locationsControllerGetCitiesByRegion,
  locationsControllerGetCountries,
  locationsControllerGetRegionsByCountry,
} from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const countriesKey = 'country'
const regionsKey = 'region'
const citiesKey = 'cities'

export function useGetCountries() {
  return useQuery({
    queryKey: [countriesKey],
    queryFn: () => locationsControllerGetCountries(),
    refetchInterval: 0,
  })
}
export function useGetRegionsByCountry(id: string) {
  return useQuery({
    queryKey: [regionsKey, id],
    queryFn: () => locationsControllerGetRegionsByCountry({ id }),
    refetchInterval: 0,
    enabled: id.length > 0,
  })
}
export function useGetCitiesByRegion(id: string) {
  return useQuery({
    queryKey: [citiesKey, id],
    queryFn: () => locationsControllerGetCitiesByRegion({ id }),
    refetchInterval: 0,
    enabled: id.length > 0,
  })
}
