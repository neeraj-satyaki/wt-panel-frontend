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

export function useRefusalApplication(id: string) {
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
      router.push(
        routes.RESULT + `?type=success&text=Заявка №${id} успешно перемещена в отказ`,
      )
    },
    onError: () => {
      router.push(
        routes.RESULT + `?type=error&text=Ошибка перемещение заявки №${id} в отказ`,
      )
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

export function useChangeProduct(productId: string) {
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
      router.push(
        routes.RESULT + `?type=success&text=Деталь №${productId} успешно заменена`,
      )
    },
    onError: () => {
      router.push(
        routes.RESULT + `?type=error&text=Ошибка при замене детали №${productId}`,
      )
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
      router.push(routes.RESULT + `?type=success&text=Успех`)
    },
    onError: () => {
      routes.RESULT + `?type=success&text=Ошибка`
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
      router.push(routes.RESULT + `?type=success&text=Счёт успешно создан`)

      queryClient.invalidateQueries({
        queryKey: ['application'],
      })
    },
    onError: () => {
      routes.RESULT + `?type=error&text=Ошибка при создании счёта`
    },
  })
}

export function useGetCheck(id: string) {
  return useQuery({
    queryKey: [getCheckKey],
    queryFn: () => panelControllerGetCheck({ id }),
  })
}
