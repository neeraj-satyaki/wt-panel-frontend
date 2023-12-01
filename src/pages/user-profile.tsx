import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { HeaderLayout } from '@/widgets/header'
import { UserProfile } from '@/widgets/user-profile'

export function UserProfilePage() {
  return (
    <HeaderLayout>
      <UiBackBtnLayout>
        <AuthProtectedPage>
          <main>
            <UserProfile />
          </main>
        </AuthProtectedPage>
      </UiBackBtnLayout>
    </HeaderLayout>
  )
}
