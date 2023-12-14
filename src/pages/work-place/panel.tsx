import { useAppOrSaleStore } from '@/entities/panel-v2'
import { NavigationPanel } from '@/features/(work-place)/work-place-navigation'
import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { HeaderLayout } from '@/widgets/header'
import { PanelTableWidget } from '@/widgets/panel-table'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function PanelPage() {
  const router = useRouter()

  const { changeCategory } = useAppOrSaleStore()
  useEffect(() => {
    const urlCategory = router.query.category as string
    const urlType = router.query.type as string

    if (urlCategory) {
      changeCategory(urlCategory, urlType)
    }
  }, [router.query.category])
  return (
    <HeaderLayout>
      <main className="space-y-4">
        <UiHeading level={'1'}>Панель</UiHeading>
        <NavigationPanel />
        <PanelTableWidget />
      </main>
    </HeaderLayout>
  )
}

export default authProtectedPage(PanelPage)
