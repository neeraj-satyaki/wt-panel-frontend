import {
  panelControllerCreateSale,
  panelControllerGetApplicationSale,
  panelControllerGetBadApplications,
  panelControllerGetCancels,
  panelControllerGetCategories,
  panelControllerGetOrgsBills,
  panelControllerMoveApplicationSale,
  panelControllerRefusalApplication,
} from '@/shared/api/generated'
import { queryClient } from '@/shared/api/query-client'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'

const badApplicationKey = ['bad-applications']
const categoriesKey = ['categories']
const applicationsOrSales = 'applications-or-sales'
const orgsBills = ['orgs-bills']
const getCancels = ['cancels']

export function useGetBadApplications() {
  return useQuery({
    queryKey: badApplicationKey,
    queryFn: panelControllerGetBadApplications,
  })
}
export function useGetCategories() {
  return useQuery({
    queryKey: categoriesKey,
    queryFn: panelControllerGetCategories,
  })
}
export function useGetApplicationsOrSales(
  title: string,
  type: string,
  page: string,
  count: string,
  q: string,
) {
  const query = useQuery({
    queryKey: [applicationsOrSales, title, type, page, q],
    queryFn: () =>
      panelControllerGetApplicationSale({ title, type, page, count, text: q }),
    placeholderData: keepPreviousData,
  })

  if (query.isSuccess)
    queryClient.invalidateQueries({ queryKey: categoriesKey })

  return query
}

export function useMoveAppSale() {
  return useMutation({
    mutationFn: panelControllerMoveApplicationSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKey })
      queryClient.invalidateQueries({ queryKey: badApplicationKey })
      queryClient.invalidateQueries({ queryKey: [applicationsOrSales] })
    },
  })
}
export function useCreateSaleMutation() {
  return useMutation({
    mutationFn: panelControllerCreateSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKey })
      queryClient.invalidateQueries({ queryKey: badApplicationKey })
      queryClient.invalidateQueries({ queryKey: [applicationsOrSales] })
    },
  })
}

export function useGetOrgsBills() {
  return useQuery({
    queryKey: [orgsBills],
    queryFn: panelControllerGetOrgsBills,
  })
}
export function useRefusalApplication() {
  return useMutation({
    mutationFn: panelControllerRefusalApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKey })
      queryClient.invalidateQueries({ queryKey: badApplicationKey })
      queryClient.invalidateQueries({ queryKey: [applicationsOrSales] })
    },
  })
}

export function useGetCancels(page: string, count: string) {
  return useQuery({
    queryKey: [getCancels, page, count],
    queryFn: () => panelControllerGetCancels({ page, count }),
  })
}
