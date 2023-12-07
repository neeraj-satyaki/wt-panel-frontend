import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import { useGetDeliveryInfo } from '@/entities/panel/queries'
import { UiSelectField, UiSelectOption } from '@/shared/ui/components/ui-select-field'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiTextField } from '@/shared/ui/components/ui-text-field'

export default function FormAddTk({ close, id }: { close: Function; id: string }) {
  const deliveryInfo = useGetDeliveryInfo(id)

  const countries: UiSelectOption[] | undefined =
    deliveryInfo.data?.tkCities.countries.map((item) => ({
      label:
        item.name === deliveryInfo.data.deliveryInfo.receipt_country
          ? `${item.name} (текущий)`
          : item.name,
      value: item.id,
    }))

  const currentIndexCountry = countries?.findIndex((item) =>
    item.label.includes('(текущий)'),
  )
  if (currentIndexCountry !== undefined && currentIndexCountry !== -1) {
    if (countries) {
      const currentCountry = countries.splice(currentIndexCountry, 1)[0]
      countries?.unshift(currentCountry)
    }
  }

  const regions: UiSelectOption[] | undefined = deliveryInfo.data?.tkCities.regions.map(
    (item) => ({
      label:
        item.name === deliveryInfo.data.deliveryInfo.receipt_region
          ? `${item.name} (текущий)`
          : item.name,
      value: item.id,
    }),
  )

  const currentIndexRegion = regions?.findIndex((item) =>
    item.label.includes('(текущий)'),
  )
  if (currentIndexRegion !== undefined && currentIndexRegion !== -1) {
    if (regions) {
      const currentRegion = regions.splice(currentIndexRegion, 1)[0]
      regions?.unshift(currentRegion)
    }
  }
  const cities: UiSelectOption[] | undefined = deliveryInfo.data?.tkCities.cities.map(
    (item) => ({
      label:
        item.name === deliveryInfo.data.deliveryInfo.receipt_city
          ? `${item.name} (текущий)`
          : item.name,
      value: item.id,
    }),
  )

  const currentIndexCity = cities?.findIndex((item) => item.label.includes('(текущий)'))
  if (currentIndexCity !== undefined && currentIndexCity !== -1) {
    if (cities) {
      const currentCity = cities.splice(currentIndexCity, 1)[0]
      cities?.unshift(currentCity)
    }
  }

  const tks: UiSelectOption[] | undefined = deliveryInfo.data?.tkCities.tks.map(
    (item) => ({
      label:
        item.name === deliveryInfo.data.deliveryInfo.tk
          ? `${item.name} (текущий)`
          : item.name,
      value: item.id,
    }),
  )

  const currentIndexTk = tks?.findIndex((item) => item.label.includes('(текущий)'))
  if (currentIndexTk !== undefined && currentIndexTk !== -1) {
    if (tks) {
      const currentTk = tks.splice(currentIndexTk, 1)[0]
      tks?.unshift(currentTk)
    }
  }

  return (
    <UiPageModalLayout close={() => close()}>
      <form
        className="flex flex-col gap-6 z-50 items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <UiHeading level={'3'}>Информация о тк</UiHeading>

        <div className="grid-cols-1 grid 744:grid-cols-2 gap-4">
          <div className="flex flex-col gap-3 w-full">
            {deliveryInfo.isLoading ? (
              <UiSpinner />
            ) : deliveryInfo.isError ? (
              <div>Ошибка</div>
            ) : !deliveryInfo.data ? (
              <div>Данные не получены</div>
            ) : (
              <div className="flex flex-col gap-2">
                <UiSelectField
                  label="Страна"
                  options={countries?.map((option) => ({
                    ...option,
                    optionProps: {
                      className: option.label.includes('(текущий)') ? 'bg-green-500' : '',
                    },
                  }))}
                />
                <UiSelectField
                  label="Регион"
                  options={regions?.map((option) => ({
                    ...option,
                    optionProps: {
                      className: option.label.includes('(текущий)') ? 'bg-green-500' : '',
                    },
                  }))}
                />
                <UiSelectField
                  label="Город"
                  options={cities?.map((option) => ({
                    ...option,
                    optionProps: {
                      className: option.label.includes('(текущий)') ? 'bg-green-500' : '',
                    },
                  }))}
                />
                <UiSelectField
                  label="Тк"
                  options={tks?.map((option) => ({
                    ...option,
                    optionProps: {
                      className: option.label.includes('(текущий)') ? 'bg-green-500' : '',
                    },
                  }))}
                />
                <UiTextField
                  label="Клиент"
                  inputProps={{
                    placeholder: 'Введите имя клиента',
                    value: deliveryInfo.data.deliveryInfo.client,
                  }}
                />
              </div>
            )}
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
