import { useCreateCheck, useGetOrgsBills } from '@/entities/panel/queries'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useForm } from 'react-hook-form'
import { ReqCreateCheck } from '@/shared/api/generated'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
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
} from '@radix-ui/react-select'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'

export default function FormCreateCheck({ close, id }: { close: Function; id: string }) {
  const orgBills = useGetOrgsBills()
  const createCheck = useCreateCheck()
  const { handleSubmit, register } = useForm<{
    data: ReqCreateCheck
  }>()

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
              <Input
                className="hidden"
                type="hidden"
                value={id}
                {...register('data.id')}
              />
              <Select {...register('data.org')}>
                <SelectTrigger>
                  <SelectValue placeholder="Организация" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Организация</SelectLabel>
                    {orgBills.data?.orgs.data.map((item, i) => (
                      <SelectItem value={item.id} key={i}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select {...register('data.bill')}>
                <SelectTrigger>
                  <SelectValue placeholder="Счёт" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Счёт</SelectLabel>
                    {orgBills.data?.bills.data.map((item, i) => (
                      <SelectItem value={item.id} key={i}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Button variant="primary">Создать</Button>
            </div>
          )}
        </form>
      ) : null}
    </UiPageModalLayout>
  )
}
