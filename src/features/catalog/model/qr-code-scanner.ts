import { routes } from '@/shared/constants/routing'
import { useRouter } from 'next/router'
import { useState } from 'react'

export function useQrCodeScanner() {
  const [showScanner, setShowScanner] = useState(false)
  const router = useRouter()
  function openScanner() {
    setShowScanner(true)
  }
  function closeScanner() {
    setShowScanner(false)
  }
  function handleSuccessScan(decodedText: string, decodedResult: any) {
    closeScanner()
    router.push(routes.PRODUCT + '/' + decodedText)
  }

  return {
    showScanner,
    openScanner,
    closeScanner,
    handleSuccessScan,
  }
}
