import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { MissedCalls } from '@/features/work-place/missed-calls-list'
import { NavigationPanel } from '@/features/work-place/work-place-navigation'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'
import { UiWorkPlaceLayout } from '@/shared/ui/layouts/ui-work-place-layout'

export function MissedCallsPage() {
  return (
    <UiHeaderLayout>
      <main>
        <AuthProtectedPage>
          <UiWorkPlaceLayout
            title={'Пропущенные звонки'}
            navigation={<NavigationPanel />}
            content={<MissedCalls />}
          />
        </AuthProtectedPage>
      </main>
    </UiHeaderLayout>
  )
}
