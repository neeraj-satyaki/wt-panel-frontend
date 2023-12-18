import { ApplicationResponseDto } from '@/shared/api/generated'
import { ReactNode } from 'react'

type Props = {
  app: ApplicationResponseDto
  feature?: ReactNode
}

export function ApplicationInfo({ app, feature }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <div>
        Заявка {app.info.id} от {app.info.date}
      </div>
      <div>Клиент: {app.info.client}</div>
      <div>Статус: {app.info.processing}</div>
      <div>Ответсвенный: {app.info.responsible}</div>
      <div>Сумма: {app.info.sum} Р</div>
      <div>Подстатус: {app.info.sub_processing}</div>
      <div>Исполнитель: {app.info.porter}</div>
      {feature}
    </div>
  )
}
