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
import { toast } from '@/shared/ui/components/ui/use-toast'
import { useMutation, useQuery } from '@tanstack/react-query'

const productsKey = 'products'
const productKey = 'product'
const similarProductsKey = 'similar-products'
const typesProducts = 'types-products'

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
        toast({
          title: 'Успешно',
          variant: 'success',
        })
    },

    onError: () => {
      toast({
        title: 'Ошибка',
        variant: 'destructive',
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
      queryClient.invalidateQueries({
        queryKey: ['application'],
      })
      queryClient.invalidateQueries({
        queryKey: ['sale'],
      }),
        toast({
          title: 'Успешно',
          variant: 'success',
        })
    },

    onError: () => {
      toast({
        title: 'Ошибка',
        variant: 'destructive',
      })
    },
  })
}
export function useMoveProduct() {
  return useMutation({
    mutationFn: productsControllerMoveProduct,
    onSuccess: () => {
      toast({
        title: 'Успешно',
        variant: 'success',
      })
    },
    onError: () => {
      toast({
        title: 'Ошибка',
        variant: 'destructive',
      })
    },
  })
}
export function useMovePallete() {
  return useMutation({
    mutationFn: productsControllerMovePallete,
    onSuccess: () => {
      toast({
        title: 'Успешно',
        variant: 'success',
      })
    },
    onError: () => {
      toast({
        title: 'Ошибка',
        variant: 'destructive',
      })
    },
  })
}

export function useGetTypesProducts() {
  return useQuery({
    queryKey: [typesProducts],
    queryFn: productsControllerGetTypesProduct,
  })
}
