import { useGetOrgsBills } from '@/entities/panel/queries'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiSelectField, UiSelectOption } from '@/shared/ui/components/ui-select-field'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'

export function FormCreateSale({
  close,
  id,
  isLoading,
  isError,
  error,
  submit,
  register,
  isSuccess,
}: {
  close: Function
  id: string
  isLoading: boolean
  isError: boolean
  error: any
  submit: Function
  register: any
  isSuccess: boolean
}) {
  const orgBills = useGetOrgsBills()

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
      {isLoading && <div>Loading...</div>}
      {isSuccess && <div>Success</div>}
      {!isLoading && isError && <div>Error</div>}
      {!isLoading && !isError && !isSuccess && (
        <form
          className="flex flex-col gap-6"
          onClick={(e) => e.stopPropagation()}
          onSubmit={(e) => {
            submit(e)
          }}
        >
          <UiHeading level={'3'}>Создание продажи</UiHeading>
          {orgBills.isError && !orgBills.isLoading ? (
            <div>Error</div>
          ) : (
            <>
              <UiTextField
                className="hidden"
                inputProps={{
                  ...register('data.id'),
                  type: 'hidden',
                  value: id,
                }}
              />
              {orgBills.isLoading ? (
                <UiSpinner />
              ) : (
                <>
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
                </>
              )}
            </>
          )}
          <UiButton variant="primary" className="px-4 py-2">
            Создать
          </UiButton>
        </form>
      )}
    </UiPageModalLayout>
  )
}
