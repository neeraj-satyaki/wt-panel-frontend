import { useAppOrSaleStore } from '@/entities/panel-v2'
import { ListCategories } from '@/features/(work-place)/categories-v2'
import { SearchPanelAppSaleFeat } from '@/features/(work-place)/search-panel-app-sale'
import { PanelTable } from './panel-table'

export function PanelTableWidget() {
  const { currentCategory } = useAppOrSaleStore()

  return (
    <div className="space-y-2">
      <ListCategories />
      {currentCategory === 'Все' && <SearchPanelAppSaleFeat />}
      <PanelTable />
    </div>
  )
}
