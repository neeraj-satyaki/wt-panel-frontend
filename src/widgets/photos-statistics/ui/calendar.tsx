import { useGetStatisticsOfPhotos } from '@/entities/images'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { Calendar } from '@/shared/ui/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/ui/components/ui/command'
import { useEffect, useState } from 'react'
import ru from 'date-fns/locale/ru'

export function CalendarOfDatePhotosStatisticsWidget() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date())
  const statisticsOfPhotos = useGetStatisticsOfPhotos(
    date.getFullYear(),
    date.getMonth() + 1,
  )
  const handleChangeDate = () => {
    statisticsOfPhotos.refetch()
  }
  useEffect(() => {
    handleChangeDate()
  }, [date])

  const totalMonth = statisticsOfPhotos.data?.stat?.reduce((acc, element) => {
    element.photographers.forEach((element) => {
      acc += element.count
    })
    return acc
  }, 0)

  return (
    <div>
      <UiHeading level={'2'}>Статистика по фотографиям</UiHeading>
      <div className="flex flex-col items-start gap-4 744:flex-row">
        <Calendar
          selected={selectedDay}
          onSelect={setSelectedDay}
          mode="single"
          className="rounded-md border shadow 1024:sticky top-0"
          locale={ru}
          onMonthChange={(date) => {
            setDate(date)
          }}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
        />
        {statisticsOfPhotos.isLoading && <div>Загрузка...</div>}
        {statisticsOfPhotos.isError && <div>Ошибка при загрузке</div>}
        {!statisticsOfPhotos.data && !statisticsOfPhotos.isLoading && (
          <div>Ничего не найдено</div>
        )}
        {statisticsOfPhotos.data?.stat && (
          <div className="space-y-4 w-full">
            {statisticsOfPhotos.data.stat.map((item, i) => {
              let dayCount = 0

              if (
                selectedDay &&
                `${selectedDay.getFullYear()}-` +
                  `${selectedDay.getMonth() + 1}`.padStart(2, '0') +
                  '-' +
                  `${selectedDay.getDate()}`.padStart(2, '0') ===
                  item.date
              ) {
                return (
                  <Command className="rounded-lg border shadow" key={i}>
                    <CommandInput placeholder="Поиск..." />
                    <CommandList className="max-h-[260px]">
                      <CommandEmpty>Ничего не найдено.</CommandEmpty>
                      <CommandGroup heading={`${item.date}`}>
                        {item.photographers.map((photographer, i) => {
                          dayCount += photographer.count
                          return (
                            <CommandItem key={i}>
                              <span>
                                {photographer.name} ({photographer.count})
                              </span>
                            </CommandItem>
                          )
                        })}
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup className="sticky bottom-0 bg-gray-50">
                        <CommandItem>
                          <span className="space-x-2">
                            <span>Сумма:</span>
                            <span className="border-b border-black">
                              за день({dayCount})
                            </span>
                            <span className="border-b border-black">
                              за месяц ({totalMonth})
                            </span>
                          </span>
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                )
              }
            })}
            {selectedDay &&
              !statisticsOfPhotos.data.stat.some(
                (item) =>
                  `${selectedDay.getFullYear()}-` +
                    `${selectedDay.getMonth() + 1}`.padStart(2, '0') +
                    '-' +
                    `${selectedDay.getDate()}`.padStart(2, '0') ===
                  item.date,
              ) && <div>Информация за данный день отсутствует</div>}
          </div>
        )}
      </div>
    </div>
  )
}
