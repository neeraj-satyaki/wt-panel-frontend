import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { NavigationPanel } from '@/features/panel-nav'
import { ReturnsList } from '@/features/returns-list'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'
import { UiWorkPlaceLayout } from '@/shared/ui/layouts/ui-work-place-layout'

export function ReturnsPage() {
  return (
    <UiHeaderLayout>
      <main>
        <AuthProtectedPage>
          <UiWorkPlaceLayout
            title={'Возвраты'}
            navigation={<NavigationPanel />}
            content={<ReturnsList />}
          />
        </AuthProtectedPage>
      </main>
    </UiHeaderLayout>
  )
}
