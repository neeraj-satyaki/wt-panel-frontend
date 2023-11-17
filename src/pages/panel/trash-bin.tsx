import { AuthProtectedPage } from '@/features/auth/ui/auth-protected-page'
import { TrashBin } from '@/features/panel'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'

export function TrashBinPage() {
  return (
    <UiHeaderLayout>
      <main>
        <AuthProtectedPage>
          <TrashBin />
        </AuthProtectedPage>
      </main>
    </UiHeaderLayout>
  )
}
