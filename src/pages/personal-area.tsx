import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { HeaderLayout } from '@/widgets/header'
import { PersonalArea } from '@/widgets/personal-area'

function PersonalAreaPage() {
  return (
    <HeaderLayout>
      <PersonalArea />
    </HeaderLayout>
  )
}

export default authProtectedPage(PersonalAreaPage)
