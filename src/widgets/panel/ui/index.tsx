import { useAppOrSaleStore } from '@/entities/panel-v2'
import { UpdateListAppSalesBtn } from '@/features/(work-place)/btn-update'
import { ListCategories } from '@/features/(work-place)/categories-v2'
import { SearchPanelAppSaleFeat } from '@/features/(work-place)/search-panel-app-sale'
import { TablePanel } from './table'
import { ListPanel } from './list'

export function PanelWidget() {
  const { currentCategory } = useAppOrSaleStore()

  return (
    <div className="space-y-2">
      <ListCategories />
      <UpdateListAppSalesBtn />
      {currentCategory === 'Все' && <SearchPanelAppSaleFeat />}
      <div className="hidden 1024:block">
        <TablePanel />
      </div>
      <div className="block 1024:hidden">
        <ListPanel />
      </div>
    </div>
  )
}
