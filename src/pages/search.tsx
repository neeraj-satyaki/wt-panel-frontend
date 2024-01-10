import { UiHeading } from '@/shared/ui/components/ui-heading'
import { HeaderLayoutWidget } from '@/widgets/header'
import { SearchWidget } from '@/widgets/search'

export function SearchPage() {
  return (
    <HeaderLayoutWidget>
      <main className="space-y-4">
        <UiHeading level={'1'}>Поиск</UiHeading>
        <SearchWidget />
      </main>
    </HeaderLayoutWidget>
  )
}
