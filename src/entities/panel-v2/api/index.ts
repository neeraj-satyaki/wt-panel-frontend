import {
  panelControllerGetApplicationSale,
  panelControllerGetCategories,
} from '@/shared/api/generated'
import { queryClient } from '@/shared/api/query-client'
import { useQuery } from '@tanstack/react-query'

const applicationsOrSales = 'applications-or-sales'
const categoriesKey = 'categories'

export function useGetAppOrSales(
  title: string,
  type: string,
  page: string,
  count: string,
  q: string,
) {
  const query = useQuery({
    queryKey: [applicationsOrSales, title, type, page],
    queryFn: () =>
      panelControllerGetApplicationSale({
        title,
        type,
        page,
        count,
        text: q,
      }),
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })

  if (query.isSuccess) {
    queryClient.invalidateQueries({
      queryKey: [categoriesKey],
    })
  }

  return query
}

export function useGetCategoriesByAppOrSales() {
  return useQuery({
    queryKey: [categoriesKey],
    queryFn: panelControllerGetCategories,
    refetchInterval: 5 * 60 * 1000,
  })
}
