import { UiHeading } from '@/shared/ui/components/ui-heading'
import { AddingPhotosWidget } from '@/widgets/adding-photos'
import { HeaderLayoutWidget } from '@/widgets/header'
import { CalendarOfDatePhotosStatisticsWidget } from '@/widgets/photos-statistics'

export function PhotographerPanelPage() {
  return (
    <HeaderLayoutWidget>
      <main className="space-y-4">
        <UiHeading level="1">Панель фотографа</UiHeading>
        <div className="grid grid-cols-1 gap-4 1024:grid-cols-5">
          <AddingPhotosWidget />
          <div className="col-span-4">
            <CalendarOfDatePhotosStatisticsWidget />
          </div>
        </div>
      </main>
    </HeaderLayoutWidget>
  )
}
