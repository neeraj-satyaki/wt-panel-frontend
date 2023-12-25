import { UiHeading } from '@/shared/ui/components/ui-heading'
import { CartWidget } from '@/widgets/cart'
import { HeaderLayout } from '@/widgets/header'

export function CartPage() {
  return (
    <HeaderLayout>
      <main className="space-y-4">
        <UiHeading level="1">Корзина</UiHeading>
        <CartWidget />
      </main>
    </HeaderLayout>
  )
}
