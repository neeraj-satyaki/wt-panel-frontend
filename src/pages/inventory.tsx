import { UiHeading } from '@/shared/ui/components/ui-heading'
import { HeaderLayout } from '@/widgets/header'
import { ListLostProducts } from '@/widgets/list-lost-products'
import { InventoryProcessWidget } from '@/widgets/process-inventory'

export function InventoryPage() {
  return (
    <HeaderLayout>
      <main className="space-y-4">
        <UiHeading level={'1'}>Инвентаризация</UiHeading>
        <InventoryProcessWidget />
        <ListLostProducts />
      </main>
    </HeaderLayout>
  )
}
