import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { HeaderLayout } from '@/widgets/header'

function ReturnsPage() {
  return (
    <HeaderLayout>
      <main>Возвраты</main>
    </HeaderLayout>
  )
}

export default authProtectedPage(ReturnsPage)
