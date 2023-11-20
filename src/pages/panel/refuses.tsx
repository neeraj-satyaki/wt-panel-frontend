import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { Refuses } from '@/features/panel'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'

export function TrashBinPage() {
  return (
    <UiHeaderLayout>
      <main>
        <AuthProtectedPage>
          <Refuses />
        </AuthProtectedPage>
      </main>
    </UiHeaderLayout>
  )
}
