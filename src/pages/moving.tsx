import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { HeaderLayout } from '@/widgets/header'
import { Moving } from '@/widgets/moving-product'

function MovingPage() {
  return (
    <HeaderLayout>
      <main className="space-y-4">
        <Moving />
      </main>
    </HeaderLayout>
  )
}

export default authProtectedPage(MovingPage)
