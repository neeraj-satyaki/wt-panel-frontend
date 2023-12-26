import { useSessionQuery } from '@/entities/session'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { CartInfo, CartProductsList, useGetCart } from '@/entities/cart'
import { AddProductToCart } from '@/features/(cart)/add-product-to-cart'
import { useCartStore } from '../model/store'
import LibPagination from '@/shared/lib/lib-pagination'

export function CartWidget() {
  const { count, page, handlePage } = useCartStore()
  const session = useSessionQuery()
  const cart = useGetCart(session.data ? session.data.cart : '', page, count)

  if (session.isLoading) return <UiSpinner />
  if (session.isError) return <div>Ошибка</div>
  if (!session.data) return <div>Нет данных</div>

  if (cart.isLoading) return <UiSpinner />
  if (cart.isError) return <div>Ошибка</div>
  if (!cart.data) return <div>Нет данных о корзине</div>

  return (
    <div className="space-y-10">
      <CartInfo cartId={session.data.cart} feature={<AddProductToCart />} />
      <CartProductsList data={cart.data} />
      <LibPagination
        currentPage={page}
        totalPages={cart.data.info.pages}
        nextPage={() => handlePage(page + 1)}
        prevPage={() => handlePage(page - 1)}
      />
    </div>
  )
}
