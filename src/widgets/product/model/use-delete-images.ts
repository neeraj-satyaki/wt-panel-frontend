import { useDeleteImage } from '@/entities/products/api'
import { useEffect, useState } from 'react'

export function useDeleteImageA() {
  const [resultModal, setResultModal] = useState(false)

  const deleteImage = useDeleteImage()
  useEffect(() => {
    if (deleteImage.isError || deleteImage.isSuccess) {
      setResultModal(true)
    }
  }, [deleteImage.isError, deleteImage.isSuccess])
  return {
    isPending: deleteImage.isPending,
    isError: deleteImage.isError,
    isSuccess: deleteImage.isSuccess,
    mutate: deleteImage.mutate,
    resultModal,
    setResultModal,
    reset: deleteImage.reset,
  }
}
