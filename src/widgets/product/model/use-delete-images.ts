import { useDeleteImage } from '@/entities/products/api'

export function useDeleteImageA() {
  const deleteImage = useDeleteImage()

  return {
    isPending: deleteImage.isPending,
    isError: deleteImage.isError,
    isSuccess: deleteImage.isSuccess,
    mutate: deleteImage.mutate,
    reset: deleteImage.reset,
  }
}
