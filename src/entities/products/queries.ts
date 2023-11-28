import {
  imagesControllerDeletImage,
  imagesControllerUploadImages,
  productsControllerGetProduct,
  productsControllerGetProducts,
  productsControllerGetSimilarProducts,
} from '@/shared/api/generated'
import { queryClient } from '@/shared/api/query-client'
import { useMutation, useQuery } from '@tanstack/react-query'

const productsKey = 'products'
const productKey = 'product'
const similarProductsKey = 'similar-products'

export function useGetProducts(q: string, count: number, page: number) {
  return useQuery({
    queryKey: [productsKey, q.toLowerCase(), page],
    queryFn: () =>
      productsControllerGetProducts({
        q: q.toLowerCase(),
        page: page.toString(),
        count: count.toString(),
      }),
    refetchOnWindowFocus: false,
  })
}

export function useGetProduct(id: string) {
  return useQuery({
    queryKey: [productKey, id],
    queryFn: () => productsControllerGetProduct(id),
    retry: 0,
    staleTime: 5 * 60 * 1000,
  })
}

export function useGetSimilarProducts(q: string, page: number, count: number) {
  return useQuery({
    queryKey: [similarProductsKey, q, page],
    queryFn: () =>
      productsControllerGetSimilarProducts({
        q: q,
        page: page.toString(),
        count: count.toString(),
      }),
    refetchOnWindowFocus: false,
  })
}

export function useUploadImage() {
  return useMutation({
    mutationFn: imagesControllerUploadImages,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productKey],
      })
    },
  })
}
export function useDeleteImage() {
  return useMutation({
    mutationFn: imagesControllerDeletImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productKey],
      })
    },
  })
}
