import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { HeaderLayout } from '@/widgets/header'

function SearchPage() {
  return (
    <HeaderLayout>
      <main className="space-y-4"></main>
    </HeaderLayout>
  )
}

export default authProtectedPage(SearchPage)
