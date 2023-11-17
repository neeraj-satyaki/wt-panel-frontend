import { AuthProtectedPage } from '@/features/auth/ui/auth-protected-page'
import { Returns } from '@/features/panel'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'

export function ReturnsPage() {
  return (
    <UiHeaderLayout>
      <main>
        <AuthProtectedPage>
          <Returns />
        </AuthProtectedPage>
      </main>
    </UiHeaderLayout>
  )
}
