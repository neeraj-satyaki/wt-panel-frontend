import {
  ChangeProductInAppSale,
  IssueProductInSaleReq,
  panelControllerDeliveryInfo,
  panelControllerGetApplicationSale,
  panelControllerGetBadApplications,
  panelControllerGetCancels,
  panelControllerGetCategories,
  panelControllerGetOrgsBills,
  panelControllerMoveApplicationSale,
  panelControllerRefusalApplication,
  productsControllerChangeProductInAppSale,
  productsControllerIssueProduct,
} from '@/shared/api/generated'
import { queryClient } from '@/shared/api/query-client'
import { useMutation, useQuery } from '@tanstack/react-query'

const badApplicationKey = ['bad-applications']
const categoriesKey = ['categories']
const applicationsOrSales = 'applications-or-sales'
const orgsBills = ['orgs-bills']
const getCancels = 'cancels'
const getDeliveryInfo = 'delivery-info'

export function useGetBadApplications() {
  return useQuery({
    queryKey: badApplicationKey,
    queryFn: panelControllerGetBadApplications,
    refetchInterval: 5 * 60 * 1000,
  })
}
export function useGetCategories() {
  return useQuery({
    queryKey: categoriesKey,
    queryFn: panelControllerGetCategories,
    refetchInterval: 5 * 60 * 1000,
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
      queryKey: categoriesKey,
    })
  }

  return query
}

export function useMoveAppSale() {
  return useMutation({
    mutationFn: panelControllerMoveApplicationSale,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKey,
      })
      queryClient.invalidateQueries({
        queryKey: badApplicationKey,
      })
      queryClient.invalidateQueries({
        queryKey: [applicationsOrSales],
      })
      queryClient.invalidateQueries({
        queryKey: ['application'],
      })
      queryClient.invalidateQueries({
        queryKey: ['sale'],
      })
    },
  })
}

export function useGetOrgsBills() {
  return useQuery({
    queryKey: [orgsBills],
    queryFn: panelControllerGetOrgsBills,
    refetchInterval: 60 * 60 * 1000,
  })
}

export function useRefusalApplication() {
  return useMutation({
    mutationFn: panelControllerRefusalApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKey,
      })
      queryClient.invalidateQueries({
        queryKey: badApplicationKey,
      })
      queryClient.invalidateQueries({
        queryKey: [applicationsOrSales],
      })
    },
  })
}

export function useGetRefuses(page: number, count: number) {
  return useQuery({
    queryKey: [getCancels, page],
    queryFn: () =>
      panelControllerGetCancels({
        page: page.toString(),
        count: count.toString(),
      }),
    refetchInterval: 5 * 60 * 1000,
  })
}

export function useChangeProduct() {
  return useMutation({
    mutationFn: (data: ChangeProductInAppSale) =>
      productsControllerChangeProductInAppSale({
        id: data.id,
        indCode: data.indCode,
        pose: data.pose,
        type: data.type,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['application'],
      })
      queryClient.invalidateQueries({
        queryKey: ['sale'],
      })
    },
  })
}
export function useIssueProductInSale() {
  return useMutation({
    mutationFn: (data: IssueProductInSaleReq) =>
      productsControllerIssueProduct({
        id: data.id,
        pose: data.pose,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sale'],
      })
    },
  })
}

export function useGetDeliveryInfo(id: string) {
  return useQuery({
    queryKey: [getDeliveryInfo, id],
    queryFn: () => panelControllerDeliveryInfo({ id }),
    refetchInterval: 5 * 60 * 1000,
  })
}
