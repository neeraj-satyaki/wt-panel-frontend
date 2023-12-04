import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { RefusesList } from '@/features/(work-place)/refuses-list'
import { NavigationPanel } from '@/features/(work-place)/work-place-navigation'
import { UiWorkPlaceLayout } from '@/shared/ui/layouts/ui-work-place-layout'
import { HeaderLayout } from '@/widgets/header'

export function RefusesPage() {
  return (
    <HeaderLayout>
      <main>
        <AuthProtectedPage>
          <UiWorkPlaceLayout
            title={'Отказы'}
            navigation={<NavigationPanel />}
            content={<RefusesList />}
          />
        </AuthProtectedPage>
      </main>
    </HeaderLayout>
  )
}
