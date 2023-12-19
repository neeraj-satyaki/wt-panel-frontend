import { useUploadImage } from '@/entities/products/api'
import { useForm } from 'react-hook-form'

export function useUploadImages(productId: string, userId?: string, username?: string) {
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
      if (userId && username) {
        const filesArray = Array.from(data.files)
        uploadImagesMutation.mutate({
          productId: productId,
          files: filesArray,
          userId: userId,
          username: username,
        })
      }
      resetField('files')
    }),
  }
}
