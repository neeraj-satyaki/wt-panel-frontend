import { useCreateCheck, useGetOrgsBills } from '@/entities/panel/queries'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiSelectField, UiSelectOption } from '@/shared/ui/components/ui-select-field'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import { useForm } from 'react-hook-form'
import { ReqCreateCheck } from '@/shared/api/generated'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

export default function FormCreateCheck({ close, id }: { close: Function; id: string }) {
  const orgBills = useGetOrgsBills()
  const createCheck = useCreateCheck()
  const { handleSubmit, register } = useForm<{
    data: ReqCreateCheck
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
    <UiPageModalLayout close={() => close()}>
      {createCheck.isPending ? <UiSpinner className="my-20 w-full" /> : null}
      {createCheck.isError ? (
        <div className="flex flex-col gap-2 items-center">
          <AnimateError />
          <div>Произошла ошибка</div>
        </div>
      ) : null}
      {createCheck.isSuccess ? (
        <div className="flex flex-col gap-2 items-center">
          <AnimateSuccess />
          <div>Успешно</div>
        </div>
      ) : null}
      {!createCheck.isPending && !createCheck.isError && !createCheck.isSuccess ? (
        <form
          className="flex flex-col gap-6"
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit((formData) => {
            createCheck.mutate(formData.data)
          })}
        >
          <UiHeading level={'3'}>Создание продажи</UiHeading>

          {orgBills.isLoading && <UiSpinner />}
          {orgBills.isError && <div>Организаций и Счетов</div>}
          {!orgBills.isError && !orgBills.isLoading && orgBills.data && (
            <div className="flex flex-col gap-2">
              <UiTextField
                className="hidden"
                inputProps={{
                  ...register('data.id'),
                  type: 'hidden',
                  value: id,
                }}
              />
              <UiSelectField
                label="Организация"
                options={orgsOptions}
                selectProps={{
                  ...register('data.org'),
                }}
              />
              <UiSelectField
                label="Счёт"
                options={billsOptions}
                selectProps={{
                  ...register('data.bill'),
                }}
              />
              <UiButton variant="primary" className="px-4 py-2">
                Создать
              </UiButton>
            </div>
          )}
        </form>
      ) : null}
    </UiPageModalLayout>
  )
}