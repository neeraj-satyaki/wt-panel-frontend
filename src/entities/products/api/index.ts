import {
  productsControllerAddProductToZakazNaryad,
  productsControllerAssignMainPhoto,
  productsControllerEditProduct,
  productsControllerGetLostProducts,
  productsControllerRemoveToLost,
} from '@/shared/api/generated'
import {
  imagesControllerDeletImage,
  imagesControllerUploadImages,
  productsControllerGetProduct,
  productsControllerGetProducts,
  productsControllerGetSimilarProducts,
  productsControllerGetTypesProduct,
  productsControllerMovePallete,
  productsControllerMoveProduct,
} from '@/shared/api/generated'
import { queryClient } from '@/shared/api/query-client'
import { routes } from '@/shared/constants/routing'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const productsKey = 'products'
const productKey = 'product'
const similarProductsKey = 'similar-products'
const typesProducts = 'types-products'
const lostProducts = 'lost-products'

export function useGetProducts(
  q: string,
  count: number,
  page: number,
  currentCategory: number,
) {
  return useQuery({
    queryKey: [productsKey, page, currentCategory],
    queryFn: () =>
      productsControllerGetProducts({
        q: q.toLowerCase(),
        page: page.toString(),
        count: count.toString(),
        pk: currentCategory,
      }),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
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

export function useGetSimilarProducts(
  q: string,
  page: number,
  count: number,
  addPart?: string,
) {
  return useQuery({
    queryKey: [similarProductsKey, q, page],
    queryFn: () =>
      productsControllerGetSimilarProducts({
        q: q,
        page: page.toString(),
        count: count.toString(),
        addPart,
      }),
  })
}

export function useUploadImage() {
  const router = useRouter()
  return useMutation({
    mutationFn: imagesControllerUploadImages,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productKey],
      })
      queryClient.invalidateQueries({
        queryKey: ['application'],
      })
      queryClient.invalidateQueries({
        queryKey: ['sale'],
      }),
        router.push(routes.SUCCESS)
    },

    onError: () => {
      router.push(routes.ERROR)
    },
  })
}
export function useDeleteImage() {
  const router = useRouter()
  return useMutation({
    mutationFn: imagesControllerDeletImage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productKey],
      })
      queryClient.invalidateQueries({
        queryKey: ['application'],
      })
      queryClient.invalidateQueries({
        queryKey: ['sale'],
      }),
        router.push(routes.SUCCESS)
    },

    onError: () => {
      router.push(routes.ERROR)
    },
  })
}
export function useMoveProduct() {
  const router = useRouter()

  return useMutation({
    mutationFn: productsControllerMoveProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [productKey],
      })
      router.push(routes.SUCCESS)
    },
    onError: () => {
      router.push(routes.ERROR)
    },
  })
}

export function useMovePallete() {
  const router = useRouter()

  return useMutation({
    mutationFn: productsControllerMovePallete,
    onSuccess: () => {
      router.push(routes.SUCCESS)
    },
    onError: () => {
      router.push(routes.ERROR)
    },
  })
}

export function useGetTypesProducts() {
  return useQuery({
    queryKey: [typesProducts],
    queryFn: productsControllerGetTypesProduct,
  })
}
export function useAssignMainPhoto() {
  const router = useRouter()

  return useMutation({
    mutationFn: productsControllerAssignMainPhoto,
    onSuccess: () => {
      router.push(routes.SUCCESS)

      queryClient.invalidateQueries({
        queryKey: [productKey],
      })
    },
    onError: () => {
      router.push(routes.ERROR)
    },
  })
}
export function useEditProduct() {
  const router = useRouter()

  return useMutation({
    mutationFn: productsControllerEditProduct,
    onSuccess: () => {
      router.push(routes.SUCCESS)

      queryClient.invalidateQueries({
        queryKey: [productKey],
      })
    },
    onError: () => {
      router.push(routes.ERROR)
    },
  })
}

export function useGetLostProducts(page: number, count: number) {
  return useQuery({
    queryKey: [lostProducts, page],
    queryFn: () =>
      productsControllerGetLostProducts({
        page: page.toString(),
        count: count.toString(),
      }),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}

export function useRemoveToLost() {
  const router = useRouter()

  return useMutation({
    mutationFn: productsControllerRemoveToLost,
    onSuccess: () => {
      router.push(routes.SUCCESS)

      queryClient.invalidateQueries({
        queryKey: ['poddon'],
      })
    },
    onError: () => {
      router.push(routes.ERROR)
    },
  })
}
export function useAddToZakazNaryad() {
  const router = useRouter()

  return useMutation({
    mutationFn: productsControllerAddProductToZakazNaryad,
    onSuccess: () => {
      router.push(routes.SUCCESS)
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
    },
    onError: () => {
      router.push(routes.ERROR)
    },
  })
}
