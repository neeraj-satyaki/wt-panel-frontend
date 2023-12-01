import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { Application } from '@/widgets/application'
import { HeaderLayout } from '@/widgets/header'

export function ApplicationPage({ id }: { id: string }) {
  return (
    <HeaderLayout>
      <UiBackBtnLayout>
        <AuthProtectedPage>
          <main>
            <Application id={id} />
          </main>
        </AuthProtectedPage>
      </UiBackBtnLayout>
    </HeaderLayout>
  )
}
