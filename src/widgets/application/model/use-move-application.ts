import { useMoveAppSale } from '@/entities/panel/queries'
import { MoveApplicationSaleDto } from '@/shared/api/generated'
import { useEffect, useState } from 'react'

export function useMoveApplication() {
  const moveAppSale = useMoveAppSale()
  const [resultModal, setResultModal] = useState(false)

  useEffect(() => {
    if (moveAppSale.isPending || moveAppSale.isSuccess || moveAppSale.isError) {
      setResultModal(true)
    }
  }, [moveAppSale])

  function closeResultModal() {
    setResultModal(false)
    moveAppSale.reset()
  }

  return {
    handleSubmit: (data: MoveApplicationSaleDto) => {
      moveAppSale.mutate(data)
    },
    isLoading: moveAppSale.isPending,
    isError: moveAppSale.isError,
    isSuccess: moveAppSale.isSuccess,
    resultModal,
    closeResultModal,
  }
}
