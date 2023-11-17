import { AuthProtectedPage } from '@/features/auth/ui/auth-protected-page'
import { Panel } from '@/features/panel'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'

export function PanelPage() {
  return (
    <UiHeaderLayout>
      <main>
        <AuthProtectedPage>
          <Panel />
        </AuthProtectedPage>
      </main>
    </UiHeaderLayout>
  )
}
