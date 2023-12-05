import { useGetTimewWork } from '@/entities/user/queries'
import { useEffect, useState } from 'react'

export function useWorkTimes(userId: string) {
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${day}.${month}.${year}`
  }

  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  const [startDate, setStartDate] = useState<string>(
    formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)),
  )
  const [endDate, setEndDate] = useState<string>(
    formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)),
  )

  useEffect(() => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    )
    setStartDate(formatDate(firstDayOfMonth))
    setEndDate(formatDate(lastDayOfMonth))
  }, [currentDate])

  const { data, isLoading, isError } = useGetTimewWork(userId, startDate, endDate)

  return {
    data,
    isLoading,
    isError,
    currentDate,
    setCurrentDate,
  }
}
