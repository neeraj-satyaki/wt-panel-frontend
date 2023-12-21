import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { CartWidget } from '@/widgets/cart'
import { HeaderLayout } from '@/widgets/header'

function CartPage() {
  return (
    <HeaderLayout>
      <main className="space-y-4">
        <UiHeading level="1">Корзина</UiHeading>
        <CartWidget />
      </main>
    </HeaderLayout>
  )
}

export default authProtectedPage(CartPage)
