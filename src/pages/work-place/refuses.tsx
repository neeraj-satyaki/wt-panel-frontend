import { authProtectedPage } from '@/features/auth'
import { RefusesList } from '@/features/(work-place)/refuses-list'
import { NavigationPanel } from '@/features/(work-place)/work-place-navigation'
import { UiWorkPlaceLayout } from '@/shared/ui/layouts/ui-work-place-layout'
import { HeaderLayout } from '@/widgets/header'

function RefusesPage() {
  return (
    <HeaderLayout>
      <main>
        <UiWorkPlaceLayout
          title={'Отказы'}
          navigation={<NavigationPanel />}
          content={<RefusesList />}
        />
      </main>
    </HeaderLayout>
  )
}

export default authProtectedPage(RefusesPage)
