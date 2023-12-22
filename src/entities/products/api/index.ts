import {
  productsControllerAssignMainPhoto,
  productsControllerEditProduct,
  productsControllerGetLostProducts,
  productsControllerRemoveToLost,
} from './../../../shared/api/generated'
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
      queryClient.invalidateQueries({
        queryKey: [productKey],
      })
      toast({
        title: 'Место успешно изменено',
        variant: 'success',
      })
    },
    onError: () => {
      toast({
        title: 'Ошибка при перемещении',
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
export function useAssignMainPhoto() {
  return useMutation({
    mutationFn: productsControllerAssignMainPhoto,
    onSuccess: () => {
      toast({
        title: 'Успешно',
        variant: 'success',
      }),
        queryClient.invalidateQueries({
          queryKey: [productKey],
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
export function useEditProduct() {
  return useMutation({
    mutationFn: productsControllerEditProduct,
    onSuccess: () => {
      toast({
        title: 'Успешно',
        variant: 'success',
      }),
        queryClient.invalidateQueries({
          queryKey: [productKey],
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
  return useMutation({
    mutationFn: productsControllerRemoveToLost,
    onSuccess: () => {
      toast({
        title: 'Успешно',
        variant: 'success',
      }),
        queryClient.invalidateQueries({
          queryKey: ['poddon'],
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
