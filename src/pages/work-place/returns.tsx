import { NavigationPanel } from '@/features/(work-place)/work-place-navigation'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { HeaderLayoutWidget } from '@/widgets/header'

export function ReturnsPage() {
  return (
    <HeaderLayoutWidget>
      <main className="space-y-4">
        <UiHeading level={'1'}>Панель</UiHeading>
        <NavigationPanel />
      </main>
    </HeaderLayoutWidget>
  )
}
