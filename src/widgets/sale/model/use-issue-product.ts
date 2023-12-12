import { useIssueProductInSale } from '@/entities/panel/queries'
import { useState } from 'react'

export function useIssueProduct(saleId: string, productId: string) {
  const [issueModal, setIssueModal] = useState(false)
  const [isNotThatProduct, setSsNotThatProduct] = useState(false)
  const issueProduct = useIssueProductInSale()

  function successScan(decodedText: string, pose: string[]) {
    if (decodedText === productId) {
      issueProduct.mutate({ id: saleId, pose })
    } else {
      setSsNotThatProduct(true)
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
