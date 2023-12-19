import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { HeaderLayout } from '@/widgets/header'
import { CalendarOfDatePhotosStatistics } from '@/widgets/photos-statistics'

function PhotoStatisticsPage() {
  return (
    <HeaderLayout>
      <main className="space-y-4">
        <UiHeading level="1">Статистика по фотографиям</UiHeading>
        <CalendarOfDatePhotosStatistics />
      </main>
    </HeaderLayout>
  )
}

export default authProtectedPage(PhotoStatisticsPage)
