import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiBackBtnLayout } from '@/shared/ui/layouts/ui-back-btn-layout'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'
import { UserProfile } from '@/widgets/user-profile'

export function UserProfilePage() {
  return (
    <UiHeaderLayout>
      <UiBackBtnLayout>
        <AuthProtectedPage>
          <main>
            <UserProfile />
          </main>
        </AuthProtectedPage>
      </UiBackBtnLayout>
    </UiHeaderLayout>
  )
}
