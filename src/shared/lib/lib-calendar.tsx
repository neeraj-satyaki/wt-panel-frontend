import React, { useState } from 'react'
import { UiButton } from '../ui/components/ui-button'
import clsx from 'clsx'

interface Holiday {
  day: number
  month: number
  name: string | undefined
}
type Props = {
  size: 'small' | 'normal' | 'large'
  data: any // It's a good practice to avoid 'any'. Consider specifying a more precise type.
}

export const LibCalendar = ({ data, size }: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [hoveredHoliday, setHoveredHoliday] = useState<Holiday | null>(null)

  const daysOfWeek: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
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
    let numberOfDays: number = 32 - new Date(year, month, 32).getDate()
    let daysArray: number[] = new Array(42).fill(-1)

    for (let i = 0; i < numberOfDays; i++) {
      daysArray[i + firstDay] = i + 1
    }

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
    return dayOfWeek === 0 || dayOfWeek === 6 // 0 - воскресенье, 6 - суббота
  }

  return (
    <div
      className={`flex flex-col items-center ${
        size === 'small' ? 'w-1/5' : size === 'normal' ? 'w-1/3' : '1/2'
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
            key={index}
            className={clsx(
              'w-full text-center rounded text-sm',
              {
                'py-1': size === 'small',
                'py-2': size === 'normal',
                'py-4': size === 'large',
              },
              {
                'bg-gray-100': day !== -1,
                'bg-transparent': day === -1,
                'bg-yellow-300':
                  day !== -1 &&
                  day === new Date().getDate() &&
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear(),
              },
              {
                'bg-red-500 text-white': isHoliday(day, currentDate.getMonth()),
              },
              {
                'bg-green-500 text-white': day !== -1 ? isWeekend(day) : '',
              },
            )}
            title={
              isHoliday(day, currentDate.getMonth())
                ? holidays.find(
                    (holiday) =>
                      holiday.day === day && holiday.month === currentDate.getMonth(),
                  )?.name
                : ''
            }
            onMouseEnter={() =>
              isHoliday(day, currentDate.getMonth()) &&
              setHoveredHoliday({
                day,
                month: currentDate.getMonth(),
                name: holidays.find(
                  (holiday) =>
                    holiday.day === day && holiday.month === currentDate.getMonth(),
                )?.name,
              })
            }
            onMouseLeave={() => setHoveredHoliday(null)}
          >
            {day !== -1 ? day : ''}
          </div>
        ))}
      </div>
      {hoveredHoliday && (
        <div className="mt-2 text-center text-sm">{`Праздник: ${hoveredHoliday.day} ${
          monthNames[hoveredHoliday.month]
        } - ${hoveredHoliday.name}`}</div>
      )}
    </div>
  )
}
