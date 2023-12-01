import { useGetSimilarProducts } from '@/entities/products/queries'
import { useDebouncedValue } from '@/shared/lib/lib-react-std'
import { useState } from 'react'

export function useSearchSimilarProductsScanner(
  code: string,
  page: number,
  count: number,
) {
  const [showScanner, setShowScanner] = useState(false)
  const [addPart, setAddPart] = useState('')
  const [isManualInput, setIsManualInput] = useState(false)

  function openScanner() {
    setShowScanner(true)
  }

  function closeScanner() {
    setShowScanner(false)
  }

  function handleSuccessScan(decodedText: string, decodedResult: any) {
    closeScanner()
    setIsManualInput(false)
    setAddPart(decodedText)
  }

  const debouncedAddPart = useDebouncedValue(addPart, isManualInput ? 2000 : 0)

  const similarProducts = useGetSimilarProducts(code, page, count, debouncedAddPart)

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
    setIsManualInput, // Добавляем функцию для установки флага ручного ввода
  }
}
