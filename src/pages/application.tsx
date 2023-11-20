import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'
import { Application } from '@/widgets/application'

export function ApplicationPage({ id }: { id: string }) {
  return (
    <UiHeaderLayout>
      <UiBackBtnLayout>
        <AuthProtectedPage>
          <main>
            <Application id={id} />
          </main>
        </AuthProtectedPage>
      </UiBackBtnLayout>
    </UiHeaderLayout>
  )
}
