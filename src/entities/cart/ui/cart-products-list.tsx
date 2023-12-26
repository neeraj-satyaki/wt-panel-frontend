import { ResCartDto } from '@/shared/api/generated'
import { routes } from '@/shared/constants/routing'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  data: ResCartDto
}

export function CartProductsList({ data }: Props) {
  return (
    <div>
      <UiHeading level={'2'}>Товары в корзине {data.info.count}</UiHeading>
      <div className="grid grid-cols-1 744:grid-cols-2 1024:grid-cols-3 1512:grid-cols-6 gap-4">
        {data.data.map((item, i) => {
          return (
            <div key={i}>
              <Link href={routes.PRODUCT + '/' + item.indcode} className="space-y-2">
                <Image
                  src={item.photos[0]}
                  alt={item.name}
                  width={600}
                  height={600}
                  className="object-cover h-52 rounded-lg"
                />
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div>Артикул: {item.article}</div>
                  <div>Место: {item.place}</div>
                  <div>Цена: {item.cost}</div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
