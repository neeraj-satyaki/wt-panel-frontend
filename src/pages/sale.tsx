import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayout } from '@/widgets/header'
import { Sale } from '@/widgets/sale'

export function SalePage({ id }: { id: string }) {
  return (
    <HeaderLayout>
      <UiBackBtnLayout>
        <AuthProtectedPage>
          <main>
            <Sale id={id} />
          </main>
        </AuthProtectedPage>
      </UiBackBtnLayout>
    </HeaderLayout>
  )
}
