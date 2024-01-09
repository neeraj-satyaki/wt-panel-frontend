import {
  ChangeProductInAppSale,
  IssueProductInSaleReq,
  ReqCreateCheck,
  panelControllerCreateCheck,
  panelControllerDeliveryInfo,
  panelControllerGetBadApplications,
  panelControllerGetCancels,
  panelControllerGetCheck,
  panelControllerGetOrgsBills,
  panelControllerRefusalApplication,
  productsControllerChangeProductInAppSale,
  productsControllerIssueProduct,
} from '@/shared/api/generated'
import { queryClient } from '@/shared/api/query-client'
import { routes } from '@/shared/constants/routing'
import { toast } from '@/shared/ui/components/ui/use-toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const badApplicationKey = ['bad-applications']
const categoriesKey = ['categories']
const applicationsOrSales = 'applications-or-sales'
const orgsBills = ['orgs-bills']
const getCancels = 'cancels'
const getDeliveryInfo = 'delivery-info'
const getCheckKey = 'check'

export function useGetBadApplications() {
  return useQuery({
    queryKey: badApplicationKey,
    queryFn: panelControllerGetBadApplications,
  })
}
export function useGetOrgsBills() {
  return useQuery({
    queryKey: [orgsBills],
    queryFn: panelControllerGetOrgsBills,
  })
}

export function useRefusalApplication() {
  const router = useRouter()
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
      router.push(routes.SUCCESS)
    },
    onError: () => {
      router.push(routes.ERROR)
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
  })
}

export function useChangeProduct() {
  const router = useRouter()

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
      router.push(routes.SUCCESS)
    },
    onError: () => {
      router.push(routes.ERROR)
    },
  })
}
export function useIssueProductInSale() {
  const router = useRouter()

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
      router.push(routes.SUCCESS)
    },
    onError: () => {
      router.push(routes.ERROR)
    },
  })
}

export function useGetDeliveryInfo(id: string) {
  return useQuery({
    queryKey: [getDeliveryInfo, id],
    queryFn: () => panelControllerDeliveryInfo({ id }),
  })
}

export function useCreateCheck() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: ReqCreateCheck) =>
      panelControllerCreateCheck({
        id: data.id,
        bill: data.bill,
        org: data.org,
      }),
    onSuccess: () => {
      router.push(routes.SUCCESS)

      queryClient.invalidateQueries({
        queryKey: ['application'],
      })
    },
    onError: () => {
      router.push(routes.ERROR)
    },
  })
}

export function useGetCheck(id: string) {
  return useQuery({
    queryKey: [getCheckKey],
    queryFn: () => panelControllerGetCheck({ id }),
  })
}
