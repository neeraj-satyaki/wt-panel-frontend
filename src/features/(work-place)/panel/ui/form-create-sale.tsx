import { useGetOrgsBills } from '@/entities/panel/queries'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useForm } from 'react-hook-form'
import { CreateSaleDto } from '@/shared/api/generated'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { useCreateSaleMutation } from '@/entities/sale/queries'
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

export default function FormCreateSale({ close, id }: { close: Function; id: string }) {
  const orgBills = useGetOrgsBills()
  const createSaleMutation = useCreateSaleMutation()
  const { handleSubmit, register } = useForm<{
    data: CreateSaleDto
  }>()

  return (
    <UiPageModalLayout close={() => close()}>
      {createSaleMutation.isPending ? <UiSpinner className="my-20 w-full" /> : null}
      {createSaleMutation.isError ? (
        <div className="flex flex-col gap-2 items-center">
          <AnimateError />
          <div>Произошла ошибка</div>
        </div>
      ) : null}
      {createSaleMutation.isSuccess ? (
        <div className="flex flex-col gap-2 items-center">
          <AnimateSuccess />
          <div>Успешно</div>
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
              <Input type="date" {...register('data.date')} />
              <Button variant="primary">Создать</Button>
            </div>
          )}
        </form>
      ) : null}
    </UiPageModalLayout>
  )
}
