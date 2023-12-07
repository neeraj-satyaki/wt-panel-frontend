import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { Application } from '@/widgets/application'
import { HeaderLayout } from '@/widgets/header'

function ApplicationPage({ id }: { id: string }) {
  return (
    <HeaderLayout>
      <UiBackBtnLayout>
        <main>
          <Application id={id} />
        </main>
      </UiBackBtnLayout>
    </HeaderLayout>
  )
}

export default authProtectedPage(ApplicationPage)
