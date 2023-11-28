import { useUploadImage } from '@/entities/products/queries'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export function useUploadImages(productId: string) {
  const [resultModal, setResultModal] = useState(false)
  const { register, handleSubmit, resetField } = useForm<{
    files: FileList
  }>()

  const uploadImagesMutation = useUploadImage()
  useEffect(() => {
    if (uploadImagesMutation.isError || uploadImagesMutation.isSuccess) {
      setResultModal(true)
    }
  }, [uploadImagesMutation.isError, uploadImagesMutation.isSuccess])

  const closeModal = () => {
    setResultModal(false)
    uploadImagesMutation.reset()
  }

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
    closeResultModal: () => closeModal(),
    resultModal,
  }
}
