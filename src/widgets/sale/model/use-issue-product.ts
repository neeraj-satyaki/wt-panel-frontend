import { useIssueProductInSale } from '@/entities/panel/api'
import { toast } from '@/shared/ui/components/ui/use-toast'
import { useState } from 'react'

export function useIssueProduct(saleId: string, productId: string) {
  const [issueModal, setIssueModal] = useState(false)
  const [isNotThatProduct, setSsNotThatProduct] = useState(false)
  const issueProduct = useIssueProductInSale()

  function successScan(decodedText: string, decodedResult: any, pose: number) {
    if (decodedText === productId) {
      issueProduct.mutate({ id: saleId, pose })
    } else {
      toast({
        title: 'Не тот товар',
        variant: 'destructive',
      })
    }
  }
  function close() {
    setIssueModal(false)
    issueProduct.reset()
    setSsNotThatProduct(false)
  }
  function open() {
    setIssueModal(true)
  }
  return {
    issueModal,
    successScan,
    issueProduct,
    close,
    open,
    isNotThatProduct,
  }
}
