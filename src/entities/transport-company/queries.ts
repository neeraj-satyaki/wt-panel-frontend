import { transportCompanyControllerGetTransportCompanies } from '@/shared/api/generated'
import { useQuery } from '@tanstack/react-query'

const transportCompaniesKey = 'all-transport-companies'

export function useGetTransportCompanies() {
  return useQuery({
    queryKey: [transportCompaniesKey],
    queryFn: () => transportCompanyControllerGetTransportCompanies(),
    refetchInterval: 0,
  })
}
