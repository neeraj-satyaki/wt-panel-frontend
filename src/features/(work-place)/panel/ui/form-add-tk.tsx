import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import { useGetDeliveryInfo } from '@/entities/panel/queries'
import { UiSelectField, UiSelectOption } from '@/shared/ui/components/ui-select-field'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import {
  useGetCitiesByRegion,
  useGetCountries,
  useGetRegionsByCountry,
} from '@/entities/locations/queries'
import { useEffect, useState } from 'react'
import { useGetTransportCompanies } from '@/entities/transport-company'

export default function FormAddTk({ close, id }: { close: Function; id: string }) {
  const [currentCountry, setCurrentCountry] = useState('')
  const [currentRegion, setCurrentRegion] = useState('')
  const [currentCity, setCurrentCity] = useState('')
  const [currentTransportCompany, setCurrentTransportCompany] = useState('')
  const deliveryInfo = useGetDeliveryInfo(id)
  const countries = useGetCountries()
  const regions = useGetRegionsByCountry(currentCountry)
  const cities = useGetCitiesByRegion(currentRegion)
  const transportCompanies = useGetTransportCompanies()

  const countriesOptions: UiSelectOption[] | undefined = countries.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }))
  const regionsOptions: UiSelectOption[] | undefined = regions.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }))
  const citiesOptions: UiSelectOption[] | undefined = cities.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }))
  const transportCompaniesOptions: UiSelectOption[] | undefined =
    transportCompanies.data?.map((item) => ({
      label: item.name,
      value: item.id,
    }))

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
                  <UiSelectField
                    label={`Страна (${deliveryInfo.data?.deliveryInfo.receipt_country})`}
                    options={countriesOptions}
                    selectProps={{ onChange: (e) => setCurrentCountry(e.target.value) }}
                  />
                )}
              </div>

              <div className="relative">
                {regions.isLoading ? (
                  <div className="flex flex-col gap-2 animate-pulse">
                    <div className="h-5 rounded w-24 bg-gray-200"></div>
                    <div className="rounded w-full h-12 bg-gray-200"></div>
                  </div>
                ) : (
                  <UiSelectField
                    label={`Регион (${deliveryInfo.data?.deliveryInfo.receipt_region})`}
                    options={regionsOptions}
                    selectProps={{ onChange: (e) => setCurrentRegion(e.target.value) }}
                  />
                )}
              </div>

              <div className="relative">
                {cities.isLoading ? (
                  <div className="flex flex-col gap-2 animate-pulse">
                    <div className="h-5 rounded w-24 bg-gray-200"></div>
                    <div className="rounded w-full h-12 bg-gray-200"></div>
                  </div>
                ) : (
                  <UiSelectField
                    label={`Город (${deliveryInfo.data?.deliveryInfo.receipt_city})`}
                    options={citiesOptions}
                    selectProps={{ onChange: (e) => setCurrentCity(e.target.value) }}
                  />
                )}
              </div>
              <UiSelectField
                label="Транспортная компания"
                options={transportCompaniesOptions}
                selectProps={{
                  onChange: (e) => setCurrentTransportCompany(e.target.value),
                }}
              />
              <UiTextField
                label="Клиент"
                inputProps={{
                  placeholder: 'Введите имя клиента',
                  value: deliveryInfo.data?.deliveryInfo.client || '',
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full"></div>
        </div>
        <UiButton variant="primary" className="px-4 py-2">
          Отправить
        </UiButton>
      </form>
    </UiPageModalLayout>
  )
}
