import { useGetSimilarProducts } from '@/entities/products/queries'
import { useState } from 'react'

export function useSearchSimilarProductsScanner(
  code: string,
  page: number,
  count: number,
) {
  const [showScanner, setShowScanner] = useState(false)
  const [addPart, setAddPart] = useState('')
  const similarProducts = useGetSimilarProducts(code, page, count, addPart)

  function openScanner() {
    setShowScanner(true)
  }

  function closeScanner() {
    setShowScanner(false)
  }

  function handleSuccessScan(decodedText: string) {
    closeScanner()
    setAddPart(decodedText)
  }

  const handleManualSearch = () => {
    similarProducts.refetch()
  }

  return {
    isFetching: similarProducts.isFetching,
    isLoading: similarProducts.isLoading,
    isError: similarProducts.isError,
    data: similarProducts.data,
    addPart,
    setAddPart,
    showScanner,
    openScanner,
    closeScanner,
    handleSuccessScan,
    handleManualSearch,
  }
}
