import { useCreateSaleMutation, useGetOrgsBills } from '@/entities/panel/queries'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiSelectField, UiSelectOption } from '@/shared/ui/components/ui-select-field'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import { useForm } from 'react-hook-form'
import { CreateSaleDto } from '@/shared/api/generated'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'

export function FormCreateSale({ close, id }: { close: Function; id: string }) {
  const orgBills = useGetOrgsBills()
  const createSaleMutation = useCreateSaleMutation()
  const { handleSubmit, register } = useForm<{
    data: CreateSaleDto
  }>()

  const orgsOptions: UiSelectOption[] | undefined = orgBills.data?.orgs.data.map(
    (item) => ({
      label: item.name,
      value: item.id,
    }),
  )

  const billsOptions: UiSelectOption[] | undefined = orgBills.data?.bills.data.map(
    (item) => ({
      label: item.name,
      value: item.id,
    }),
  )

  return (
    <UiPageModalLayout close={() => [close()]}>
      {createSaleMutation.isPending ? <div>Loading...</div> : null}
      {createSaleMutation.isError ? (
        <div className="flex flex-col gap-2 items-center">
          <AnimateError />
          <UiHeading level={'4'}>Произошла ошибка</UiHeading>
        </div>
      ) : null}
      {createSaleMutation.isSuccess ? (
        <div className="flex flex-col gap-2 items-center">
          <AnimateSuccess />
          <UiHeading level={'4'}>Успешно</UiHeading>
        </div>
      ) : null}
      {!createSaleMutation.isPending &&
      !createSaleMutation.isError &&
      !createSaleMutation.isSuccess ? (
        <form
          className="flex flex-col gap-6"
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit((formData) => {
            createSaleMutation.mutate(formData.data)
          })}
        >
          <UiHeading level={'3'}>Создание продажи</UiHeading>
          <UiTextField
            className="hidden"
            inputProps={{
              ...register('data.id'),
              type: 'hidden',
              value: id,
            }}
          />
          <UiSelectField
            options={orgsOptions}
            selectProps={{
              ...register('data.org'),
            }}
          />
          <UiSelectField
            options={billsOptions}
            selectProps={{
              ...register('data.bill'),
            }}
          />
          <UiButton variant="primary" className="px-4 py-2">
            Создать
          </UiButton>
        </form>
      ) : null}
    </UiPageModalLayout>
  )
}
