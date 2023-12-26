import { SearchApp } from '@/features/(search)/search-app'
import { SearchPoddon } from '@/features/(search)/search-poddon'
import { SearchProductQr } from '@/features/(search)/search-product'
import { SearchSale } from '@/features/(search)/search-sale'
import { SearchShelf } from '@/features/(search)/search-shelf'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { HeaderLayoutWidget } from '@/widgets/header'

export function SearchPage() {
  return (
    <HeaderLayoutWidget>
      <main className="space-y-4">
        <UiHeading level={'1'}>Поиск</UiHeading>
        <div className="flex flex-col gap-6 744:flex-row">
          <div className="flex flex-col gap-2 1024:flex-row">
            <SearchProductQr />
            <SearchPoddon />
            <SearchShelf />
          </div>
          <div className="flex flex-col gap-2 1024:flex-row">
            <SearchApp />
            <SearchSale />
          </div>
        </div>
      </main>
    </HeaderLayoutWidget>
  )
}
