import { useAppOrSaleStore, useGetAppOrSales } from '@/entities/panel-v2'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
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
    >
      {appOrSale.isFetching ? <UiSpinner /> : 'Обновить'}
    </Button>
  )
}
