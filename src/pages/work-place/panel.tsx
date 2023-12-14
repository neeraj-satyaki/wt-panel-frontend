import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import {
  LearningWorkPlace,
  useLearning,
} from '@/features/(work-place)/learning-work-place'
import { Panel } from '@/features/(work-place)/panel'
import { NavigationPanel } from '@/features/(work-place)/work-place-navigation'

import { UiWorkPlaceLayout } from '@/shared/ui/layouts/ui-work-place-layout'
import { HeaderLayout } from '@/widgets/header'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { TableWidgetV2 } from '@/widgets/table-panel-v2/ui/table'

function PanelPage() {
  const { endLearn, learnStatus, getLocal } = useLearning()

  if (!getLocal) return <UiSpinner />

  return (
    <HeaderLayout>
      <main>
        {learnStatus != 'false' ? (
          <LearningWorkPlace endLearn={endLearn} />
        ) : (
          // <UiWorkPlaceLayout
          //   title={'Панель'}
          //   navigation={<NavigationPanel />}
          //   content={<Panel />}
          // />
          <UiWorkPlaceLayout
            title={'Панель'}
            navigation={<NavigationPanel />}
            content={<TableWidgetV2 />}
          />
        )}
      </main>
    </HeaderLayout>
  )
}

export default authProtectedPage(PanelPage)
