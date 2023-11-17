import { UiHeading } from '@/shared/ui/components/ui-heading'
import { NavigationPanel } from './navigation-panel'

export function MissedCalls() {
  return (
    <div className="flex flex-col gap-6">
      <div className="430:hidden">
        <UiHeading level={'5'}>Пропущенные звонки</UiHeading>
      </div>
      <div className="hidden 430:block">
        <UiHeading level={'4'}>Пропущенные звонки</UiHeading>
      </div>
      <NavigationPanel />
    </div>
  )
}
