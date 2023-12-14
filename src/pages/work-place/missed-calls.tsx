import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { HeaderLayout } from '@/widgets/header'

function MissedCallsPage() {
  return (
    <HeaderLayout>
      <main>Пропущенные звонки</main>
    </HeaderLayout>
  )
}

export default authProtectedPage(MissedCallsPage)
