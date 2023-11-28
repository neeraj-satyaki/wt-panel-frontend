import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { RefusesList } from '@/features/work-place/refuses-list'
import { NavigationPanel } from '@/features/work-place/work-place-navigation'
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
