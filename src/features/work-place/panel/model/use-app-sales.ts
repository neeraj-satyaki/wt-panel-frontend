import {
  useGetApplicationsOrSales,
  useGetCategories,
  useMoveAppSale,
} from '@/entities/panel/queries'
import { useDebauncedValue } from '@/shared/lib/lib-react-std'
import { useEffect, useState } from 'react'

export function useAppSales() {
  const categories = useGetCategories()
  const [currentCategory, setCurrentCateogory] = useState('Все')
  const [type, setType] = useState('')
  function changeCategory(category: string, type: string) {
    setCurrentCateogory(category)
    setType(type)
  }

  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const count = 30
  const debouncedQ = useDebauncedValue(q, 800)
  const appSales = useGetApplicationsOrSales(
    currentCategory,
    type,
    page.toString(),
    count.toString(),
    debouncedQ,
  )
  useEffect(() => {
    setPage(1)
  }, [currentCategory])

  return {
    categories: {
      currentCategory,
      changeCategory,
      isLoading: categories.isLoading,
      isError: categories.isError,
      data: categories.data,
    },
    search: {
      q,
      setQ,
    },
    appSales: {
      isLoading: appSales.isLoading,
      isError: appSales.isError,
      data: appSales.data,
      page,
      setPage,
    },
  }
}

export function useMoveAppSaleA() {
  const moveAppSale = useMoveAppSale()
  const [actionModal, setActionModal] = useState(false)
  const [actionId, setActionId] = useState('')
  const [actionProcessing, setActionProcessing] = useState('')
  const [actionSubProcessng, setActionSubProcessng] = useState('')
  const [actionCreateSaleModal, setActionCreateSaleModal] = useState(false)

  function openCreateSaleModal() {
    setActionModal(false)
    setActionCreateSaleModal(true)
  }
  function openActionModal(
    actionId: string,
    actionProcessing: string,
    actionSubProcessng: string,
  ) {
    setActionModal(true)
    setActionId(actionId)
    setActionProcessing(actionProcessing)
    setActionSubProcessng(actionSubProcessng)
    moveAppSale.reset()
  }
  return {
    actionModal,
    openActionModal,
    openCreateSaleModal,
    actionCreateSaleModal,
    moveAppSale,
    actionId,
    setActionCreateSaleModal,
    setActionModal,
    actionProcessing,
    actionSubProcessng,
  }
}
