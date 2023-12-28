import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useGetDeliveryInfo } from '@/entities/panel/api'
import {
  useGetCitiesByRegion,
  useGetCountries,
  useGetRegionsByCountry,
} from '@/entities/locations/api'
import { useEffect, useState } from 'react'
import { useGetTransportCompanies } from '@/entities/transport-company'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/components/ui/select'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'

export default function AddTk({ close, id }: { close: Function; id: string }) {
  const [currentCountry, setCurrentCountry] = useState('')
  const [currentRegion, setCurrentRegion] = useState('')
  const [currentCity, setCurrentCity] = useState('')
  const [currentTransportCompany, setCurrentTransportCompany] = useState('')
  const deliveryInfo = useGetDeliveryInfo(id)
  const countries = useGetCountries()
  const regions = useGetRegionsByCountry(currentCountry)
  const cities = useGetCitiesByRegion(currentRegion)
  const transportCompanies = useGetTransportCompanies()

  useEffect(() => {
    if (countries.data && countries.data.length > 0) {
      setCurrentCountry(countries.data[0].id)
    }
  }, [countries.data])

  useEffect(() => {
    if (regions.data && regions.data.length > 0) {
      setCurrentRegion(regions.data[0].id)
    } else {
      setCurrentRegion('0')
    }
  }, [regions.data])

  useEffect(() => {
    if (cities.data && cities.data.length > 0) {
      setCurrentCity(cities.data[0].id)
    }
  }, [cities.data])
  return (
    <UiPageModalLayout close={() => close()}>
      <form
        className="flex flex-col gap-6 z-50 items-start"
        onClick={(e) => e.stopPropagation()}
      >
        <UiHeading level={'3'}>Информация о тк</UiHeading>
        <div className="grid-cols-1 grid">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-2">
              <div className="relative">
                {countries.isLoading ? (
                  <div className="flex flex-col gap-2 animate-pulse">
                    <div className="h-5 rounded w-24 bg-gray-200"></div>
                    <div className="rounded w-full h-12 bg-gray-200"></div>
                  </div>
                ) : (
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите страну" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Страна</SelectLabel>
                        {countries.data?.map((item, i) => (
                          <SelectItem value={item.id} key={i}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="relative">
                {regions.isLoading ? (
                  <div className="flex flex-col gap-2 animate-pulse">
                    <div className="h-5 rounded w-24 bg-gray-200"></div>
                    <div className="rounded w-full h-12 bg-gray-200"></div>
                  </div>
                ) : (
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите регион" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Регион</SelectLabel>
                        {regions.data?.map((item, i) => (
                          <SelectItem key={i} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="relative">
                {cities.isLoading ? (
                  <div className="flex flex-col gap-2 animate-pulse">
                    <div className="h-5 rounded w-24 bg-gray-200"></div>
                    <div className="rounded w-full h-12 bg-gray-200"></div>
                  </div>
                ) : (
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите город" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Город</SelectLabel>
                        {cities.data?.map((item, i) => (
                          <SelectItem value={item.id} key={i}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тк" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Транспортная компания</SelectLabel>
                    {transportCompanies.data?.map((item, i) => (
                      <SelectItem value={item.id} key={i}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                placeholder="Клиент"
                value={deliveryInfo.data?.deliveryInfo.client || ''}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full"></div>
        </div>
        <Button variant="primary">Отправить</Button>
      </form>
    </UiPageModalLayout>
  )
}
