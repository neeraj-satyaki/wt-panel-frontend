import { AdminProtectedPage } from '@/features/auth/ui/protected/admin-protected-page'
import { HeaderLayout } from '@/widgets/header'

export function AdminPanelMainPage() {
  return (
    <HeaderLayout>
      <AdminProtectedPage>
        <main>Админ панель пока что не имеет функционала</main>
      </AdminProtectedPage>
    </HeaderLayout>
  )
}
