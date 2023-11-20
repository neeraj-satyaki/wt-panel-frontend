import { AdminProtectedPage } from '@/features/auth/ui/protected/admin-protected-page'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'

export function AdminPanelMainPage() {
  return (
    <UiHeaderLayout>
      <AdminProtectedPage>
        <main>Admin Panel (Main)</main>
      </AdminProtectedPage>
    </UiHeaderLayout>
  )
}
