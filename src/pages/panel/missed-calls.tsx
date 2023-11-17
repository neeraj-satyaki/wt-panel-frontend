import { AuthProtectedPage } from '@/features/auth/ui/auth-protected-page'
import { MissedCalls } from '@/features/panel'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'

export function MissedCallsPage() {
  return (
    <UiHeaderLayout>
      <main>
        <AuthProtectedPage>
          <MissedCalls />
        </AuthProtectedPage>
      </main>
    </UiHeaderLayout>
  )
}
