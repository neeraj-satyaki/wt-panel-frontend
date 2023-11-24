import Link from 'next/link'
import { routes } from '@/shared/constants/routing'
import { LibPagination } from '@/shared/lib/lib-pagination'
import { FormCreateSale } from './form-create-sale'
import { CategoriesPanel } from './categories-panel'
import { SearchPanel } from './search-panel'
import { useAppSales, useMoveAppSaleA } from '../model/use-app-sales'
import { headings } from './config'
import { ActionModal } from './action-modal'
import { Roboto_Flex } from 'next/font/google'
const roboto_flex = Roboto_Flex({ subsets: ['latin'], weight: '300' })

function getColorProcessing(processing: string) {
  switch (processing) {
    case 'Обращение':
      return 'bg-[#FFFB93]'
    case 'Заявка':
      return 'bg-[#FFA6A6]'
    case 'Сборка':
      return 'bg-[#70F45A]'
    case 'Продажа':
      return 'bg-[#FB7FEF]'
    case 'Отправка в тк':
      return 'bg-[#8A63FA]'
    case 'Отправка в тк':
      return 'bg-[#60E2FF]'
    case 'Отправлено клиенту':
      return 'bg-[#60E2FF]'
    case 'Упаковка':
      return 'bg-[#C67700]'
    case 'Заказ получен':
      return 'bg-[#55FFE0]'
    default:
      return ''
  }
}
function getColorSubProcessing(subProcessing: string) {
  switch (subProcessing) {
    case 'Готов':
      return 'bg-green-400'
    default:
      return ''
  }
}
export function Panel() {
  const { search, categories, appSales } = useAppSales()
  const {
    actionCreateSaleModal,
    actionModal,
    setActionCreateSaleModal,
    setActionModal,
    actionId,
    moveAppSale,
    actionProcessing,
    actionSubProcessng,
    openActionModal,
    openCreateSaleModal,
  } = useMoveAppSaleA()

  return (
    <div className="flex flex-col gap-6">
      {actionCreateSaleModal && (
        <FormCreateSale close={() => setActionCreateSaleModal(false)} id={actionId} />
      )}
      {actionModal && (
        <ActionModal
          actionProcessing={actionProcessing}
          moveAppSale={moveAppSale}
          actionId={actionId}
          actionSubProcessng={actionSubProcessng}
          openCreateSaleModal={openCreateSaleModal}
          setActionModal={setActionModal}
        />
      )}
      <div className="flex flex-col gap-3 744:gap-[16px]">
        <CategoriesPanel
          isLoading={categories.isLoading}
          isError={categories.isError}
          changeCategory={categories.changeCategory}
          data={categories.data || []}
          currentCategory={categories.currentCategory}
        />
        {categories.currentCategory === 'Все' && (
          <SearchPanel q={search.q} setQ={(text) => search.setQ(text)} />
        )}

        <table className={roboto_flex.className}>
          <thead className="bg-gray-200">
            {headings.map((heading, i) => (
              <th className={`py-2 text-sm font-semibold border border-white`} key={i}>
                {heading.title}
              </th>
            ))}
          </thead>
          <tbody>
            {appSales.isLoading ? <div>Loading...</div> : ''}
            {appSales.isError ? <div>Something broke</div> : ''}
            {appSales.data &&
              appSales.data.data.map((item, i) => {
                const isApplicationOrSale = ['Обращение', 'Заявка', 'Сборка'].includes(
                  item.processing,
                )
                return (
                  <tr className="text-sm text-center border hover:bg-gray-100" key={i}>
                    <td className="py-2 border">
                      <Link
                        href={`${
                          isApplicationOrSale ? routes.APPLICATION : routes.SALE
                        }/${item.id}`}
                      >
                        {item.id}
                      </Link>
                    </td>
                    <td className="border">{item.client}</td>
                    <td className="border">
                      <Link href={routes.USER_PROFILE + '/' + item.responsible.id}>
                        {item.responsible.name}
                        {item.responsible.phone}
                      </Link>
                    </td>
                    <td className={`${getColorProcessing(item.processing)} border`}>
                      {item.processing}
                    </td>
                    <td
                      className={`${getColorSubProcessing(item.sub_processing)} border`}
                    >
                      {item.sub_processing}
                    </td>
                    <td className="border">
                      <Link href={routes.USER_PROFILE + '/' + item.porter.id}>
                        {item.porter.name}
                        {item.porter.phone}
                      </Link>
                    </td>
                    <td className="border">
                      {['Обращение', 'Заявка', 'Сборка', 'Продажа', 'Упаковка'].includes(
                        item.processing,
                      ) ? (
                        <button
                          onClick={() =>
                            openActionModal(item.id, item.processing, item.sub_processing)
                          }
                        >
                          Действие
                        </button>
                      ) : null}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        {appSales.data && appSales.data.info.pages > 1 ? (
          <LibPagination
            currentPage={appSales.page}
            totalPages={appSales.data.info.pages}
            nextPage={() => appSales.setPage(appSales.page + 1)}
            prevPage={() => appSales.setPage(appSales.page - 1)}
          />
        ) : null}
      </div>
    </div>
  )
}
