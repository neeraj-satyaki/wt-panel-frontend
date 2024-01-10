import { SearchApp } from '@/features/(search)/search-app'
import { SearchPoddon } from '@/features/(search)/search-poddon'
import { SearchProductQr } from '@/features/(search)/search-product'
import { SearchSale } from '@/features/(search)/search-sale'
import { SearchShelf } from '@/features/(search)/search-shelf'

export function SearchWidget() {
  return (
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
  )
}
