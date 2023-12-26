import { UiHeading } from '@/shared/ui/components/ui-heading'
import { HeaderLayoutWidget } from '@/widgets/header'
import { ListLostProductsWidget } from '@/widgets/list-lost-products'
import { InventoryProcessWidget } from '@/widgets/process-inventory'

export function InventoryPage() {
  return (
    <HeaderLayoutWidget>
      <main className="space-y-4">
        <UiHeading level={'1'}>Инвентаризация</UiHeading>
        <InventoryProcessWidget />
        <ListLostProductsWidget />
      </main>
    </HeaderLayoutWidget>
  )
}
