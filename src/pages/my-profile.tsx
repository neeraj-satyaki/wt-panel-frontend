import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { HeaderLayout } from '@/widgets/header'
import { MyProfile } from '@/widgets/my-profile'

export function MyProfilePage() {
  return (
    <HeaderLayout>
      <AuthProtectedPage>
        <main>
          <MyProfile />
        </main>
      </AuthProtectedPage>
    </HeaderLayout>
  )
}
