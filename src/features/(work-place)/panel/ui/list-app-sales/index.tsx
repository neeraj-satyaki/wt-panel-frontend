import { highlightText } from '@/shared/lib/lib-highlight-text'
import Link from 'next/link'
import { routes } from '@/shared/constants/routing'
import { DataDto, SessionInfoDto } from '@/shared/api/generated'
import { getColorProcessing } from '../../model/use-table'
import { UnderStatusModal } from '../table/under-status-modal'
import { UiListAppSales } from '@/shared/ui/layouts/ui-list-products-app-sales'
import { MoveButton } from '../action/move-button'

type Props = {
  appSales: DataDto[]
  searchQuery: string
  session: SessionInfoDto | null
}

export default function ListAppSales({ appSales, searchQuery, session }: Props) {
  return (
    <UiListAppSales>
      {appSales.map((item, i) => {
        const isApplicationOrSale = ['Обращение', 'Заявка', 'Сборка'].includes(
          item.processing,
        )

        return (
          <div
            key={i}
            className="bg-white rounded-lg p-4 flex flex-col gap-2 items-start justify-between border border-gray-300"
          >
            <Link
              href={`${isApplicationOrSale ? routes.APPLICATION : routes.SALE}/${
                item.id
              }`}
            >
              <div className="text-lg font-semibold">
                {highlightText(item.id, searchQuery)}
              </div>
              <div className="text-gray-600">
                <span>Клиент: </span>
                <span>{item.client}</span>
              </div>
              <div className="text-gray-600">
                <span>Менеджер: </span>
                <span>{item.responsible.name} </span>
                <span>{item.responsible.phone}</span>
              </div>
              <div className="text-gray-600">
                <span>Исполнитель: </span>
                <span>{item.porter.name}</span>
              </div>
            </Link>
            <div className="flex gap-2 items-center">
              <div
                className={`${getColorProcessing(
                  item.processing,
                )} py-2 px-4 rounded font-semibold inline-block`}
              >
                <span>{item.processing} </span>
                <span className="border-b-[1px] border-black">{item.tk}</span>
              </div>
              <UnderStatusModal
                processing={item.processing}
                subProcessing={item.sub_processing}
              />
              {session?.roles.some((role) =>
                ['Администратор', 'Менеджер'].includes(role.title),
              ) && (
                <>
                  {['Обращение', 'Заявка', 'Сборка', 'Продажа', 'Упаковка'].includes(
                    item.processing,
                  ) ? (
                    <MoveButton item={item} />
                  ) : null}
                </>
              )}
            </div>
          </div>
        )
      })}
    </UiListAppSales>
  )
}
