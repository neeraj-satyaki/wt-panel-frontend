import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayoutWidget } from '@/widgets/header'
import { UserProfileWidget } from '@/widgets/user-profile'

export function UserProfilePage() {
  return (
    <HeaderLayoutWidget>
      <UiBackBtnLayout>
        <main>
          <UserProfileWidget />
        </main>
      </UiBackBtnLayout>
    </HeaderLayoutWidget>
  )
}
