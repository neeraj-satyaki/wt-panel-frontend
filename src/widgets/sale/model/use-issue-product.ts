import { useIssueProductInSale } from '@/entities/panel/api'
import { routes } from '@/shared/constants/routing'
import { useRouter } from 'next/router'
import { useState } from 'react'

export function useIssueProduct(saleId: string, productId: string) {
  const [issueModal, setIssueModal] = useState(false)
  const [isNotThatProduct, setSsNotThatProduct] = useState(false)
  const issueProduct = useIssueProductInSale()
  const router = useRouter()
  function successScan(decodedText: string, decodedResult: any, pose: number) {
    if (decodedText === productId) {
      issueProduct.mutate({ id: saleId, pose })
    } else {
      router.push(routes.ERROR)
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
