import { useGetApplicationsOrSales } from '@/entities/panel/queries'
import { useDebauncedValue } from '@/shared/lib/react-std'
import { useEffect, useRef, useState } from 'react'

export function useTable() {
  const [q, setQ] = useState<string>('')
  const [currentCategory, setCurrentCateogory] = useState<string>('Все')
  const [type, setType] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const count = 30

  function changeCategory(category: string, type: string) {
    setCurrentCateogory(category)
    setType(type)
  }

  const debouncedQ = useDebauncedValue(q, 400)

  const listApplicationsSales = useGetApplicationsOrSales(
    currentCategory,
    type,
    page.toString(),
    count.toString(),
    debouncedQ,
  )

  function nextPage() {
    setPage(page + 1)
  }
  function prevPage() {
    setPage(page - 1)
  }

  useEffect(() => {
    setPage(1)
  }, [currentCategory])

  return {
    currentCategory,
    changeCategory,
    data: listApplicationsSales.data,
    isLoading: listApplicationsSales.isLoading,
    isError: listApplicationsSales.isError,
    nextPage,
    prevPage,
    currentPage: page,
    setQ,
    q,
  }
}

export function useModal() {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [createSaleModal, setCreateSaleModal] = useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) close()
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [modalRef])

  function open() {
    setShowModal(true)
  }

  function close() {
    setShowModal(false)
  }

  return {
    isShow: showModal,
    open,
    close,
    modalRef,
    createSaleModal,
    setCreateSaleModal,
  }
}

export function useUnderStatusModal() {
  const [showModal, setShowModal] = useState<boolean>(false)

  function open() {
    setShowModal(true)
  }
  function close() {
    setShowModal(false)
  }

  return {
    open,
    close,
    isShow: showModal,
  }
}
