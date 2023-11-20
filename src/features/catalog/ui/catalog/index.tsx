import { UiHeading } from '@/shared/ui/components/ui-heading'
import { SearchPanel } from './search-panel'
import { ListProducts } from './list-products'
import { useListProducts } from '../../model/use-list-products'

export function Catalog() {
  const products = useListProducts()

  return (
    <div className="flex flex-col gap-4">
      <>
        <div className="430:hidden">
          <UiHeading level={'5'}>Каталог товаров</UiHeading>
        </div>
        <div className="hidden 430:block">
          <UiHeading level={'4'}>Каталог товаров</UiHeading>
        </div>
      </>
      <SearchPanel products={products} />
      <ListProducts products={products} q={products.q} />
    </div>
  )
}
