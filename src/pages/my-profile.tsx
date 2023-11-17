import { AuthProtectedPage } from '@/features/auth/ui/auth-protected-page'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'
import { MyProfile } from '@/widgets/my-profile'

export function MyProfilePage() {
  return (
    <UiHeaderLayout>
      <AuthProtectedPage>
        <main>
          <MyProfile />
        </main>
      </AuthProtectedPage>
    </UiHeaderLayout>
  )
}
