import { CartInfo, CartProductsList } from '@/entities/cart'

export function CartWidget() {
  return (
    <div>
      <CartInfo />
      <CartProductsList />
    </div>
  )
}
