import { UiHeading } from '@/shared/ui/components/ui-heading'
import { Alert, AlertTitle } from '@/shared/ui/components/ui/alert'
import { ScannPoddon } from './scan-poddon-btn'
import { useProcessInventory } from '../model/store'
import { ScannProduct } from './scan-product'
import { SearchPoddon } from '@/features/(search)/search-poddon'
import { ScannShelf } from './scan-shelf-btn'

export function InventoryProcessWidget() {
  const { placeId } = useProcessInventory()

  return (
    <div>
      <UiHeading level={'2'}>Процесс инвентаризации</UiHeading>
      <div className="border p-4 space-y-2 rounded-lg shadow max-w-[600px]">
        <SearchPoddon />
        <Alert variant="destructive" className="p-4 text-center">
          <AlertTitle className="gap-2 text-xl font-bold">
            Не забудь сменить место
          </AlertTitle>
        </Alert>
        <div className="space-y-2">
          <div className="text-center text-xl">
            {placeId ? `Поддон зафиксирован (${placeId})` : 'Место не зафиксировано'}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 flex-col 1024:flex-row">
              <ScannPoddon />
              <ScannShelf />
            </div>
            <ScannProduct />
          </div>
        </div>
      </div>
    </div>
  )
}
