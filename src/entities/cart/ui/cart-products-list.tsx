import { AddProductToZakazNaryad } from '@/features/(product)/add-product-to-cart'
import { ResCartDto } from '@/shared/api/generated'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { ProductCard } from '@/entities/products/ui/product-card'

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
            <ProductCard
              key={i}
              name={item.name}
              article={item.article}
              indcode={item.indcode}
              place={item.place}
              cost={item.cost}
              photos={item.photos}
              feature={<AddProductToZakazNaryad productId={item.indcode} />}
            />
          )
        })}
      </div>
    </div>
  )
}
