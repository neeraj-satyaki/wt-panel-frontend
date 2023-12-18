import { useUploadImage } from '@/entities/products/api'
import { useForm } from 'react-hook-form'

export function useUploadImages(productId: string) {
  const { register, handleSubmit, resetField } = useForm<{
    files: FileList
  }>()

  const uploadImagesMutation = useUploadImage()

  return {
    isPending: uploadImagesMutation.isPending,
    isError: uploadImagesMutation.isError,
    isSuccess: uploadImagesMutation.isSuccess,
    register,
    handleSubmit: handleSubmit((data) => {
      const filesArray = Array.from(data.files)
      uploadImagesMutation.mutate({ productId: productId, files: filesArray })
      resetField('files')
    }),
  }
}
