import { Item } from './item'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiError } from '@/shared/ui/components/ui-error'
import { SkeletonApplication } from './skeleton-application'
import { useGetApplication } from '@/entities/application'

export const Application = ({ id }: { id: string }) => {
  const application = useGetApplication(id)

  if (application.isLoading) return <SkeletonApplication />
  if (!application.data) return <UiError />
  if (application.isError) return <UiError />

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <div>
          <span className="font-semibold text-xl">Заявка </span>
          {application.data.info.id} от {application.data.info.date}
        </div>
        <div>
          <span className="font-semibold">Клиент: </span>
          {application.data.info.client || 'Не указано'}
        </div>
        <div>
          <span className="font-semibold">Статус: </span>
          {application.data.info.processing || 'Не указано'}
        </div>
        <div>
          <span className="font-semibold">store keeper: </span>
          {application.data.info.store_keeper || 'Не указано'}
        </div>
        <div>
          <span className="font-semibold">Ответсвенный: </span>
          {application.data.info.responsible || 'Не указано'}
        </div>
        <div>
          <span className="font-semibold">Сумма: </span>
          {application.data.info.sum || 'Не указано'} Р
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <UiHeading level={'4'}>Товары</UiHeading>
        <div className="grid grid-cols-6 gap-4">
          {application.data.data.map((item) => {
            return <Item data={item} />
          })}
        </div>
      </div>
    </div>
  )
}
