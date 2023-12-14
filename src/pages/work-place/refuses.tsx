import { authProtectedPage } from '@/features/auth'
import { HeaderLayout } from '@/widgets/header'

function RefusesPage() {
  return (
    <HeaderLayout>
      <main>Отказы</main>
    </HeaderLayout>
  )
}

export default authProtectedPage(RefusesPage)
