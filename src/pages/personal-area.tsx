import { AuthProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { HeaderLayout } from '@/widgets/header'
import { PersonalArea } from '@/widgets/personal-area'

export function PersonalAreaPage() {
  return (
    <HeaderLayout>
      <AuthProtectedPage>
        <PersonalArea />
      </AuthProtectedPage>
    </HeaderLayout>
  )
}
