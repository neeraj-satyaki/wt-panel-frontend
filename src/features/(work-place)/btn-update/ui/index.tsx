import { useAppOrSaleStore, useGetAppOrSales } from '@/entities/panel-v2'
import { Button } from '@/shared/ui/components/ui/button'

export function UpdateListAppSalesBtn() {
  const { currentCategory, type, page, count, q } = useAppOrSaleStore()
  const appOrSale = useGetAppOrSales(
    currentCategory,
    type,
    page.toString(),
    count.toString(),
    q,
  )
  return (
    <Button
      onClick={() => appOrSale.refetch()}
      disabled={appOrSale.isFetching}
      variant="primary"
      className="text-2xl h-14 w-full font-semibold 1024:text-sm 1024:h-auto 1024:w-auto"
    >
      {appOrSale.isFetching ? 'Загрузка...' : 'Обновить'}
    </Button>
  )
}
