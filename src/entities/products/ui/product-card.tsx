import { routes } from '@/shared/constants/routing'
import Link from 'next/link'
import { ReactNode } from 'react'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'

type Props = {
  name: string
  article: string
  indcode: string
  place: string
  cost: string
  photos: string[]
  feature?: ReactNode
}

export function ProductCard({
  name,
  article,
  indcode,
  place,
  cost,
  photos,
  feature,
}: Props) {
  const content = (
    <div>
      <Image
        src={photos?.length ? photos[0] : ImageNotFound}
        alt={name || ''}
        width={600}
        height={400}
        quality={75}
        className="object-cover w-full h-48 rounded-lg"
      />
      <div className="p-2">
        <div className="font-semibold">{name || 'Не указано'}</div>
        <div>Артикул: {article || 'Не указано'}</div>
        <div>Инд-код: {indcode || 'Не указано'}</div>
        <div>Место: {place || 'Не указано'}</div>
        <div>Цена: {cost || 'Не указано'} Р</div>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-lg flex flex-col justify-between">
      {indcode ? (
        <Link href={routes.PRODUCT + '/' + indcode} className="flex flex-col gap-2">
          {content}
        </Link>
      ) : (
        <div className="flex flex-col gap-2">{content}</div>
      )}
      {feature}
    </div>
  )
}
