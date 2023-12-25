import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayout } from '@/widgets/header'
import { UserProfile } from '@/widgets/user-profile'

export function UserProfilePage() {
  return (
    <HeaderLayout>
      <UiBackBtnLayout>
        <main>
          <UserProfile />
        </main>
      </UiBackBtnLayout>
    </HeaderLayout>
  )
}
