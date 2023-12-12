import { useIssueProductInSale } from '@/entities/panel/queries'
import { useAddTrackNumber } from '@/entities/sale/queries'
import { useState } from 'react'

export function useAddTrackNumberA() {
  const [addTrackNumberModal, setAddTrackNumberModal] = useState(false)
  const issueProduct = useIssueProductInSale()
  const addTrackNumberMutation = useAddTrackNumber()

  function successScan(decodedText: string, saleId: string): void {
    addTrackNumberMutation.mutate({ saleId: saleId, trackNumber: decodedText })
  }

  function close() {
    setAddTrackNumberModal(false)
  }
  function open() {
    setAddTrackNumberModal(true)
  }
  return {
    isPending: addTrackNumberMutation.isPending,
    isSuccess: addTrackNumberMutation.isSuccess,
    isError: addTrackNumberMutation.isError,
    addTrackNumberModal,
    successScan,
    issueProduct,
    close,
    open,
  }
}
