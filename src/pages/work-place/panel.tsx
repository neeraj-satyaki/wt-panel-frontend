import { useAppOrSaleStore } from '@/entities/panel-v2'
import { NavigationPanel } from '@/features/(work-place)/work-place-navigation'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { HeaderLayoutWidget } from '@/widgets/header'
import { PanelWidget } from '@/widgets/panel'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function PanelPage() {
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
    <HeaderLayoutWidget>
      <main className="space-y-4">
        <UiHeading level={'1'}>Панель</UiHeading>
        <NavigationPanel />
        <PanelWidget />
      </main>
    </HeaderLayoutWidget>
  )
}
