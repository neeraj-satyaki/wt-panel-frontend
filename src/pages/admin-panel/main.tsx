import { adminProtectedPage } from '@/features/auth/ui/protected/admin-protected-page'
import { HeaderLayout } from '@/widgets/header'

function AdminPanelMainPage() {
  return (
    <HeaderLayout>
      <main>Админ панель пока что не имеет функционала</main>
    </HeaderLayout>
  )
}

export default adminProtectedPage(AdminPanelMainPage)
