import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { NavigationPanel } from '@/features/panel-nav'
import { RefusesList } from '@/features/refuses-list'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'
import { UiWorkPlaceLayout } from '@/shared/ui/layouts/ui-work-place-layout'

export function RefusesPage() {
  return (
    <UiHeaderLayout>
      <main>
        <AuthProtectedPage>
          <UiWorkPlaceLayout
            title={'Отказы'}
            navigation={<NavigationPanel />}
            content={<RefusesList />}
          />
        </AuthProtectedPage>
      </main>
    </UiHeaderLayout>
  )
}
