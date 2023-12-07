import { useGetSale } from '@/entities/sale'
import { routes } from '@/shared/constants/routing'
import { UiPageSpinner } from '@/shared/ui/components/ui-page-spinner'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'
import { UiHeading } from '@/shared/ui/components/ui-heading'

type Props = {
  id: string
}

export const SaleForClient = ({ id }: Props) => {
  const saleForClient = useGetSale(id)
  if (saleForClient.isLoading) return <UiPageSpinner />
  if (saleForClient.isError) return <div>Ошибка</div>
  if (!saleForClient.data) return <div>Данные не получены</div>

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div>
          <span className="font-semibold text-xl">Продажа </span>
          {saleForClient.data.info.id} от {saleForClient.data.info.date}
        </div>
        <div className="flex gap-2">
          <div>
            <span className="font-semibold">Заявка: </span>
            <Link
              href={routes.APPLICATION + '/' + saleForClient.data.info.application.id}
            >
              {saleForClient.data.info.application.id}
            </Link>
          </div>
          <span className="font-semibold">от: </span>
          <div>{saleForClient.data.info.application.date}</div>
        </div>
        <div>
          <span className="font-semibold">Клиент: </span>
          {saleForClient.data.info.client}
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Статус: </span>
          {saleForClient.data.info.processing}
        </div>
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Подстатус: </span>
          <span
            className={clsx('', {
              'bg-green-400 py-2 px-4 rounded-lg':
                saleForClient.data.info.sub_processing === 'Готов' ||
                saleForClient.data.info.sub_processing === 'Вручен',
            })}
          >
            {saleForClient.data.info.sub_processing}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="font-semibold">Ответсвенный: </div>
          <div>{saleForClient.data.info.responsible}</div>
        </div>
        <div>
          <span className="font-semibold">Сумма: </span>
          {saleForClient.data.info.sum} Р
        </div>
      </div>

      <div>
        <UiHeading level="2">Товары</UiHeading>
        <UiListProductsLayout>
          {saleForClient.data.data.map((product, i) => {
            return (
              <div className="flex flex-col gap-2" key={i}>
                <div className="flex flex-col gap-2">
                  <Image
                    src={product.photos?.length ? product.photos[0] : ImageNotFound}
                    alt={product.name || ''}
                    width={600}
                    height={400}
                    className="object-cover w-full h-40 rounded-lg"
                  />
                  <div>
                    <div className="font-semibold">{product.name || 'Не указано'}</div>
                    <div>Артикль: {product.article || 'Не указано'}</div>
                    <div>Кол-во: {product.count || 'Не указано'}</div>
                    <div>Место: {product.place || 'Не указано'}</div>
                    <div>
                      Наличие на К складе:{' '}
                      {product.availability_in_k_warehouse === 1 ? 'Есть' : 'Нет'}
                    </div>
                    <div>Цена: {product.cost || 'Не указано'} Р</div>
                  </div>
                </div>
              </div>
            )
          })}
        </UiListProductsLayout>
      </div>
    </div>
  )
}