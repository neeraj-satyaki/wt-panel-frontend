import { SaleDto } from '@/shared/api/generated'
import { routes } from '@/shared/constants/routing'
import Link from 'next/link'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'
import { UiButton } from '@/shared/ui/components/ui-button'
import { useIssueProduct } from '../model/use-issue-product'
import { Suspense, lazy } from 'react'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'

const ScannerAcceptProduct = lazy(() => import('./scanner-accept-product'))

export const Item = ({
  saleId,
  data,
  subProcessing,
  processing,
}: {
  saleId: string
  data: SaleDto
  subProcessing: string
  processing: string
}) => {
  const { issueModal, close, open, successScan, issueProduct, isNotThatProduct } =
    useIssueProduct(saleId, data.id)
  return (
    <div className="flex flex-col gap-2">
      {processing === 'Продажа' && (
        <div className="flex">
          {data.state === 'Да' && (
            <div className="bg-green-500 py-2 px-4 rounded-lg font-semibold text-white">
              Выдан
            </div>
          )}
          {data.state === 'Нет' && (
            <div className="bg-red-500 py-2 px-4 rounded-lg font-semibold text-white">
              Не выдан
            </div>
          )}
        </div>
      )}
      {issueModal && (
        <Suspense fallback={<UiPageSpinner />}>
          <ScannerAcceptProduct
            isPending={issueProduct.isPending}
            isError={issueProduct.isError}
            isSuccess={issueProduct.isSuccess}
            isNotThatProduct={isNotThatProduct}
            close={close}
            successScan={successScan}
            position={data.position}
          />
        </Suspense>
      )}
      {data.id ? (
        <Link href={routes.PRODUCT + '/' + data.id} className="flex flex-col gap-2">
          <Image
            src={data.photos?.length ? data.photos[0] : ImageNotFound}
            alt={data.name || ''}
            width={600}
            height={400}
            className="object-cover w-full h-40 rounded-lg"
          />
          <div>
            <div className="font-semibold">{data.name || 'Не указано'}</div>
            <div>Артикул: {data.article || 'Не указано'}</div>
            <div>Кол-во: {data.count || 'Не указано'}</div>
            <div>Место: {data.place || 'Не указано'}</div>
            <div>
              Наличие на К складе:{' '}
              {data.availability_in_k_warehouse === 1 ? 'Есть' : 'Нет'}
            </div>
            <div>Цена: {data.cost || 'Не указано'} Р</div>
          </div>
        </Link>
      ) : (
        <div className="flex flex-col gap-2">
          <Image
            src={data.photos?.length ? data.photos[0] : ImageNotFound}
            alt={data.name || ''}
            width={600}
            height={400}
            className="object-cover w-full h-40 rounded-lg"
          />
          <div>
            <div className="font-semibold">{data.name || 'Не указано'}</div>
            <div>Артикул: {data.article || 'Не указано'}</div>
            <div>Кол-во: {data.count || 'Не указано'}</div>
            <div>Место: {data.place || 'Не указано'}</div>
            <div>
              Наличие на К складе:{' '}
              {data.availability_in_k_warehouse === 1 ? 'Есть' : 'Нет'}
            </div>
            <div>Цена: {data.cost || 'Не указано'} Р</div>
          </div>
        </div>
      )}
      {subProcessing === 'Выполняется' &&
        data.state === 'Нет' &&
        processing === 'Продажа' && (
          <div>
            <UiButton variant={'primary'} className="px-4 py-2" onClick={() => open()}>
              Проверить
            </UiButton>
          </div>
        )}
    </div>
  )
}
