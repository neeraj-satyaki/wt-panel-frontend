import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { HeaderLayout } from '@/widgets/header'

function InventoryPage() {
  return (
    <HeaderLayout>
      <main className="space-y-4">
        <UiHeading level={'1'}>Инвентаризация</UiHeading>
        <div>Инвентаризация</div>
      </main>
    </HeaderLayout>
  )
}

export default authProtectedPage(InventoryPage)
