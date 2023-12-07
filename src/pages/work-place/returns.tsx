import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { ReturnsList } from '@/features/(work-place)/returns-list'
import { NavigationPanel } from '@/features/(work-place)/work-place-navigation'
import { UiWorkPlaceLayout } from '@/shared/ui/layouts/ui-work-place-layout'
import { HeaderLayout } from '@/widgets/header'

function ReturnsPage() {
  return (
    <HeaderLayout>
      <main>
        <UiWorkPlaceLayout
          title={'Возвраты'}
          navigation={<NavigationPanel />}
          content={<ReturnsList />}
        />
      </main>
    </HeaderLayout>
  )
}

export default authProtectedPage(ReturnsPage)
