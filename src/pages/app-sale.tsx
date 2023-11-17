import { AuthProtectedPage } from '@/features/auth/ui/auth-protected-page'
import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'

export function AppSalePage() {
  return (
    <UiHeaderLayout>
      <UiBackBtnLayout>
        <AuthProtectedPage>
          <main>App Sale</main>
        </AuthProtectedPage>
      </UiBackBtnLayout>
    </UiHeaderLayout>
  )
}
