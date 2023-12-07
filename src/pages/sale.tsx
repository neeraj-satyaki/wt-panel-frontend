import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayout } from '@/widgets/header'
import { Sale } from '@/widgets/sale'

function SalePage({ id }: { id: string }) {
  return (
    <HeaderLayout>
      <UiBackBtnLayout>
        <main>
          <Sale id={id} />
        </main>
      </UiBackBtnLayout>
    </HeaderLayout>
  )
}

export default authProtectedPage(SalePage)
