import { Roboto_Flex } from 'next/font/google'
import { Tr } from './tr'
import { ApplicationSaleDto, DataDto } from '@/shared/api/generated'
import { TableSkeleton } from './table-skeleton'
import { UiError } from '@/shared/ui/components/ui-error'
import { LibPagination } from '@/shared/lib/lib-pagination'
import {
  useCreateSale,
  useMoveAppSaleA,
  useRefuseApplication,
} from '@/features/panel/model/use-move-app-sale'
import { useCreateSaleModal } from '@/features/panel/model/use-table'
import { useModalActions } from '../../model/use-modal-actions'
import { FormCreateSale } from './form-create-sale'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import { UiButton } from '@/shared/ui/components/ui-button'

const roboto = Roboto_Flex({
  subsets: ['latin'],
  weight: '300',
})

type Props = {
  data: ApplicationSaleDto | undefined
  isLoading: boolean
  isError: boolean
  nextPage: Function
  prevPage: Function
  currentPage: number
  q: string
}
interface HeadingInterface {
  title: string
}
const headings: HeadingInterface[] = [
  { title: '№ заявки/продажи' },
  { title: 'Клиент' },
  { title: 'Менеджер' },
  { title: 'Статус' },
  { title: 'Подстатус' },
  { title: 'Исполнитель' },
  { title: 'Действия' },
]
export const Table = ({
  data,
  isLoading,
  isError,
  nextPage,
  prevPage,
  currentPage,
  q,
}: Props) => {
  const modalActions = useModalActions()
  const createSale = useCreateSale()
  const createSaleModal = useCreateSaleModal()

  const move = useMoveAppSaleA()
  const refuseApplication = useRefuseApplication()

  if (isLoading) return <TableSkeleton />
  if (!data) return <UiError />
  if (isError) return <UiError />

  const theadContent = headings.map((heading, i) => (
    <th className={`border border-[#A9AABC] py-2`} key={i}>
      {heading.title}
    </th>
  ))
  const tbodyContent = data.data.map((item: DataDto, i: number) => {
    return <Tr item={item} key={i} q={q} openModalActions={modalActions.open} />
  })

  return (
    <div className="w-full text-sm flex flex-col gap-4">
      {modalActions.isShow && (
        <UiPageModalLayout close={modalActions.close}>
          {modalActions.processing === 'Обращение' && (
            <div className="flex flex-col gap-4">
              <UiButton
                variant="primary"
                className="py-3 px-4"
                onClick={() => [
                  modalActions.close(),
                  move.handleSubmit(modalActions.itemId, 'Заявка', '1', 'Заявка', false),
                ]}
              >
                В работу
              </UiButton>
              <UiButton
                variant="primary"
                className="py-3 px-4"
                onClick={() => [
                  modalActions.close(),
                  refuseApplication.handleSubmit(modalActions.itemId),
                ]}
              >
                Отказ
              </UiButton>
            </div>
          )}
          {modalActions.processing === 'Заявка' && (
            <div className="flex flex-col gap-4">
              <UiButton
                variant="primary"
                className="py-3 px-4"
                onClick={() => [
                  modalActions.close(),
                  move.handleSubmit(modalActions.itemId, 'Сборка', '1', 'Заявка', false),
                ]}
              >
                Передать на сборку
              </UiButton>
              <UiButton
                variant="primary"
                className="py-3 px-4"
                onClick={() => [
                  modalActions.close(),
                  move.handleSubmit(modalActions.itemId, 'Сборка', '2', 'Заявка', true),
                ]}
              >
                Собрать самому
              </UiButton>
              <UiButton
                variant="danger"
                className="py-3 px-4"
                onClick={() => [
                  modalActions.close(),
                  refuseApplication.handleSubmit(modalActions.itemId),
                ]}
              >
                Отказ
              </UiButton>
            </div>
          )}
          {modalActions.processing === 'Сборка' && (
            <div className="flex flex-col gap-4">
              <UiButton
                disabled={modalActions.subProcessing != 'Готов'}
                variant="primary"
                className="py-3 px-4"
                onClick={() => [
                  modalActions.close(),
                  createSaleModal.setCreateSaleModal(!createSaleModal.createSaleModal),
                ]}
              >
                Превратить в продажу
              </UiButton>
              <UiButton
                disabled={modalActions.subProcessing != 'Готов'}
                variant="primary"
                className="py-3 px-4"
                onClick={() => [
                  modalActions.close(),
                  move.handleSubmit(modalActions.itemId, 'Сборка', '1', 'Заявка', false),
                ]}
              >
                Пересобрать
              </UiButton>
              <UiButton
                variant="danger"
                className="hover:bg-gray-100 py-3 transition-all px-6"
                onClick={() => [
                  modalActions.close(),
                  refuseApplication.handleSubmit(modalActions.itemId),
                ]}
              >
                Отказ
              </UiButton>
            </div>
          )}
          {modalActions.processing === 'Продажа' && (
            <div className="flex flex-col gap-4">
              <UiButton
                disabled={modalActions.subProcessing != 'Готов'}
                variant="primary"
                className="py-3 px-4"
                onClick={() => [
                  modalActions.close(),
                  move.handleSubmit(
                    modalActions.itemId,
                    'Упаковка',
                    '1',
                    'Продажа',
                    false,
                  ),
                ]}
              >
                Отправить на упаковку
              </UiButton>
              <UiButton
                disabled={modalActions.subProcessing != 'Готов'}
                variant="primary"
                className="py-3 px-4"
                onClick={() => [
                  modalActions.close(),
                  move.handleSubmit(
                    modalActions.itemId,
                    'Заказ получен',
                    '0',
                    'Продажа',
                    false,
                  ),
                ]}
              >
                Отдать клиенту
              </UiButton>
            </div>
          )}
          {modalActions.processing === 'Упаковка' && (
            <div className="flex flex-col gap-4">
              <UiButton
                disabled={modalActions.subProcessing != 'Готов'}
                variant="primary"
                className="py-3 px-4"
                onClick={() => [
                  modalActions.close(),
                  move.handleSubmit(
                    modalActions.itemId,
                    'Отправка в тк',
                    '1',
                    'Продажа',
                    false,
                  ),
                ]}
              >
                Отправить в тк
              </UiButton>
              <UiButton
                disabled={modalActions.subProcessing != 'Готов'}
                variant="primary"
                className="py-3 px-4"
                onClick={() => [
                  modalActions.close(),
                  move.handleSubmit(
                    modalActions.itemId,
                    'Заказ получен',
                    '0',
                    'Продажа',
                    false,
                  ),
                ]}
              >
                Выдать клиенту
              </UiButton>
            </div>
          )}
        </UiPageModalLayout>
      )}
      {createSaleModal.createSaleModal && (
        <FormCreateSale
          close={() => createSaleModal.setCreateSaleModal(false)}
          id={modalActions.itemId}
          isLoading={createSale.isLoading}
          isError={createSale.isError}
          isSuccess={createSale.isSuccess}
          error={createSale.error}
          submit={createSale.handleSubmit}
          register={createSale.register}
        />
      )}
      {move.res && (
        <UiPageModalLayout close={move.closeRes}>
          <div>{move.isLoading && <div>Loading...</div>}</div>
          <div>{move.isError && <div>Error</div>}</div>
          <div>{move.isSuccess && <div>Success</div>}</div>
        </UiPageModalLayout>
      )}
      {refuseApplication.res && (
        <UiPageModalLayout close={move.closeRes}>
          <div>{refuseApplication.isLoading && <div>Loading...</div>}</div>
          <div>{refuseApplication.isError && <div>Error</div>}</div>
          <div>{refuseApplication.isSuccess && <div>Success</div>}</div>
        </UiPageModalLayout>
      )}
      <table className={`w-full ${roboto.className}`}>
        <thead className="bg-gray-200">{theadContent} </thead>
        <tbody>{tbodyContent}</tbody>
      </table>
      {data.info.pages > 1 && (
        <LibPagination
          currentPage={currentPage}
          totalPages={data.info.pages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </div>
  )
}
