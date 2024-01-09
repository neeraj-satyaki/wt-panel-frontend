import { NavigationPanel } from '@/features/(work-place)/work-place-navigation'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { HeaderLayoutWidget } from '@/widgets/header'

export function MissedCallsPage() {
  return (
    <HeaderLayoutWidget>
      <main className="space-y-4">
        <UiHeading level={'1'}>Пропущенные звонки</UiHeading>
        <NavigationPanel />
      </main>
    </HeaderLayoutWidget>
  )
}
