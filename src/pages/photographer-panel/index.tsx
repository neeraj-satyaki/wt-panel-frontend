import { UiHeading } from '@/shared/ui/components/ui-heading'
import { AddingPhotosWidget } from '@/widgets/adding-photos'
import { HeaderLayout } from '@/widgets/header'
import { CalendarOfDatePhotosStatistics } from '@/widgets/photos-statistics'

export function PhotographerPanelPage() {
  return (
    <HeaderLayout>
      <main className="space-y-4">
        <UiHeading level="1">Панель фотографа</UiHeading>
        <AddingPhotosWidget />
        <CalendarOfDatePhotosStatistics />
      </main>
    </HeaderLayout>
  )
}
