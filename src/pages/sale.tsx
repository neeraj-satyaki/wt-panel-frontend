import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'
import { Sale } from '@/widgets/sale'

export function SalePage({ id }: { id: string }) {
  return (
    <UiHeaderLayout>
      <UiBackBtnLayout>
        <AuthProtectedPage>
          <main>
            <Sale id={id} />
          </main>
        </AuthProtectedPage>
      </UiBackBtnLayout>
    </UiHeaderLayout>
  )
}
