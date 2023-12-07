import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { MissedCalls } from '@/features/(work-place)/missed-calls-list'
import { NavigationPanel } from '@/features/(work-place)/work-place-navigation'
import { UiWorkPlaceLayout } from '@/shared/ui/layouts/ui-work-place-layout'
import { HeaderLayout } from '@/widgets/header'

function MissedCallsPage() {
  return (
    <HeaderLayout>
      <main>
        <UiWorkPlaceLayout
          title={'Пропущенные звонки'}
          navigation={<NavigationPanel />}
          content={<MissedCalls />}
        />
      </main>
    </HeaderLayout>
  )
}

export default authProtectedPage(MissedCallsPage)
