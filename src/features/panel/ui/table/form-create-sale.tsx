import { useGetOrgsBills } from '@/entities/panel/queries'
import { useCreateSale } from '../../model/use-move-app-sale'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiSelectField, UiSelectOption } from '@/shared/ui/components/ui-select-field'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiError } from '@/shared/ui/components/ui-error'

export function FormCreateSale({ close, id }: { close: Function; id: string }) {
  const createSale = useCreateSale()
  const orgBills = useGetOrgsBills()

  if (orgBills.isLoading) return <UiSpinner />
  if (!orgBills.data) return <div>Данные не получены</div>
  if (orgBills.isError) return <UiError />

  const orgsOptions: UiSelectOption[] = orgBills.data.orgs.data.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  const billsOptions: UiSelectOption[] = orgBills.data.bills.data.map((item) => ({
    label: item.name,
    value: item.id,
  }))

  return (
    <div
      className="fixed w-full h-screen bg-black/40 left-0 top-0 backdrop-blur-lg z-20 flex justify-center items-center"
      onClick={() => close(false)}
    >
      <div className="bg-white px-10 py-10 rounded-lg shadow-lg ">
        {createSale.isLoading ? (
          <UiSpinner />
        ) : createSale.isError ? (
          <div>Ошибка</div>
        ) : createSale.isSuccess ? (
          <div>Успех</div>
        ) : (
          <form
            className="flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              createSale.handleSubmit(e)
            }}
          >
            <UiHeading level={'3'}>Создание продажи</UiHeading>
            <UiTextField
              className="hidden"
              inputProps={{
                ...createSale.register('data.id'),
                type: 'hidden',
                value: id,
              }}
            />
            <UiSelectField
              options={orgsOptions}
              selectProps={{
                ...createSale.register('data.org'),
              }}
            />
            <UiSelectField
              options={billsOptions}
              selectProps={{
                ...createSale.register('data.bill'),
              }}
            />
            <UiButton variant="primary" className="px-4 py-2">
              Создать
            </UiButton>
          </form>
        )}
      </div>
    </div>
  )
}
