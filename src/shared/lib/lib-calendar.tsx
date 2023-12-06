import React, { useEffect, useState } from 'react'
import { UiButton } from '../ui/components/ui-button'
import clsx from 'clsx'
import { WorkTime } from '../api/generated'

interface Holiday {
  day: number
  month: number
  name: string | undefined
}
type Props = {
  size: 'small' | 'normal' | 'large'
  workDays: WorkTime[]
  changeDate: (date: Date) => void
  date: Date
}

export const LibCalendar = ({ workDays, size, changeDate, date }: Props) => {
  const [currentDate, setCurrentDate] = useState(date ? date : new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  const daysOfWeek: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] // Start from Monday
  const monthNames: string[] = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ]

  const getDaysArray = (year: number, month: number): number[] => {
    let firstDay: number = new Date(year, month, 1).getDay()
    firstDay = firstDay === 0 ? 6 : firstDay - 1

    let numberOfDays: number = 32 - new Date(year, month, 32).getDate()
    let daysArray: number[] = new Array(42).fill(-1)

    for (let i = 0; i < numberOfDays; i++) daysArray[i + firstDay] = i + 1

    return daysArray
  }

  const goPrevMonth = () => {
    let newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    setCurrentDate(newDate)
  }

  const goNextMonth = () => {
    let newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    setCurrentDate(newDate)
  }

  useEffect(() => {
    changeDate(currentDate)
  }, [currentDate, changeDate])

  const days: number[] = getDaysArray(currentDate.getFullYear(), currentDate.getMonth())
  const holidays: Holiday[] = [
    { day: 1, month: 0, name: 'Новый год' },
    { day: 23, month: 1, name: 'День защитника Отечества' },
    {
      day: 8,
      month: 2,
      name: 'Международный женский день',
    },
    { day: 9, month: 4, name: 'День Победы' },
    { day: 12, month: 5, name: 'День России' },
    { day: 4, month: 10, name: 'День народного единства' },
  ]

  const isHoliday = (day: number, month: number): boolean => {
    return holidays.some((holiday) => holiday.day === day && holiday.month === month)
  }

  const isWeekend = (day: number): boolean => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dayOfWeek = date.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6
  }

  const isWorkday = (day: number): boolean => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const isHoliday = holidays.some(
      (holiday) => holiday.day === day && holiday.month === currentDate.getMonth(),
    )
    return !isWeekend && !isHoliday
  }

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDay(clickedDate)
  }
  const getSelectedDateStatus = (date: Date): string | null => {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    if (isHoliday(day, month)) {
      const holiday = holidays.find((h) => h.day === day && h.month === month)
      return holiday?.name || null
    } else if (isWeekend(day)) {
      return 'Выходной'
    } else if (isWorkday(day)) {
      const workDay = workDays.find((workDay) => parseInt(workDay.day) === day)
      return workDay
        ? `Рабочий день: ${workDay.startTime || 'Отсутсвует'} - ${
            workDay.endTime || 'Отсутсвует'
          }`
        : 'Рабочий день, но информация о времени отсутствует'
    }

    return 'Ошибка: не удалось определить статус дня'
  }

  return (
    <div
      className={`flex flex-col items-center w-full ${
        size === 'small'
          ? 'max-w-[400px]'
          : size === 'normal'
          ? 'max-w-[600px]'
          : 'max-w-[800px]'
      }`}
    >
      <div className="flex w-full justify-between items-center mb-4">
        <UiButton
          variant="outlined"
          onClick={goPrevMonth}
          className="py-1 px-2 text-sm font-medium"
        >
          Назад
        </UiButton>
        <span className="text-md">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <UiButton
          variant="outlined"
          onClick={goNextMonth}
          className="py-1 px-2 text-sm font-medium"
        >
          Вперёд
        </UiButton>
      </div>
      <div className="grid grid-cols-7 gap-1 w-full mb-1 text-sm">
        {daysOfWeek.map((dayName) => (
          <div key={dayName} className="text-center font-semibold">
            {dayName}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 w-full font-medium">
        {days.map((day, index) => (
          <div
            onClick={() => handleDayClick(day)}
            key={index}
            className={clsx(
              'w-full text-center rounded text-sm',
              {
                'py-1': size === 'small',
                'py-2': size === 'normal',
                'py-4': size === 'large',
              },
              {
                '': day !== -1,
                'bg-transparent': day === -1,
                'bg-yellow-300':
                  day !== -1 &&
                  day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear(),
                'bg-orange-500': selectedDay && day === selectedDay.getDate(),
              },
              {
                'bg-red-500 text-white': isHoliday(day, currentDate.getMonth()),
              },
              {
                'cursor-pointer': day !== -1,
                'bg-green-500 text-white': day !== -1 ? isWeekend(day) : '',
              },
              {
                'bg-blue-500 text-white': day !== -1 ? isWorkday(day) : '',
              },
            )}
          >
            {day !== -1 ? day : ''}
          </div>
        ))}
      </div>
      {selectedDay && <div>{getSelectedDateStatus(selectedDay)}</div>}
    </div>
  )
}
