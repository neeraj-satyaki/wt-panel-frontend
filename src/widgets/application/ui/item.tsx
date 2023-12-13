import { SaleDto } from '@/shared/api/generated'
import { routes } from '@/shared/constants/routing'
import Link from 'next/link'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'
import { useState } from 'react'
import SimilarProductsForChange from './similar-products-for-change'

export const Item = ({
  appId,
  data,
  subProcessing,
}: {
  appId: string
  data: SaleDto
  subProcessing: string
}) => {
  const [page, setPage] = useState(1)
  const count = 28

  return (
    <div className="flex flex-col gap-2">
      {data.id ? (
        <Link href={routes.PRODUCT + '/' + data.id} className="flex flex-col gap-2">
          <Image
            src={data.photos?.length ? data.photos[0] : ImageNotFound}
            alt={data.name || ''}
            width={600}
            height={400}
            quality={75}
            className="object-cover w-full h-40 rounded-lg"
          />
          <div>
            <div className="font-semibold">{data.name || 'Не указано'}</div>
            <div>Артикул: {data.article || 'Не указано'}</div>
            <div>Кол-во: {data.count || 'Не указано'}</div>
            <div>Место: {data.place || 'Не указано'}</div>
            <div>
              Наличие на К складе:
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
      {subProcessing === 'Выполняется' && (
        <SimilarProductsForChange
          pose={data.position}
          code={data.code}
          page={page}
          count={count}
          setPage={setPage}
          appId={appId}
        />
      )}
    </div>
  )
}
