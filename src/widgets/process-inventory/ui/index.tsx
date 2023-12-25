import { UiHeading } from '@/shared/ui/components/ui-heading'
import { Alert, AlertTitle } from '@/shared/ui/components/ui/alert'
import { ScannPoddon } from './scan-poddon-btn'
import { useProcessInventory } from '../model/store'
import { ScannProduct } from './scan-product'
import { SearchPoddon } from '@/features/(search)/search-poddon'
import { ScannShelf } from './scan-shelf-btn'

export function InventoryProcessWidget() {
  const { placeId, type } = useProcessInventory()

  return (
    <div>
      <UiHeading level={'2'}>Процесс инвентаризации</UiHeading>
      <div className="border p-4 space-y-2 rounded-lg shadow max-w-[500px]">
        <SearchPoddon />
        <div className="space-y-4">
          <Alert variant="destructive" className="p-4 text-center">
            <AlertTitle className="text-xl font-bold 1024:text-sm 1024:font-medium">
              Не забудь сменить место
            </AlertTitle>
          </Alert>
          <div className="space-y-2">
            <Alert
              variant={placeId ? 'default' : 'destructive'}
              className={`p-4 text-center ${placeId ? '' : 'animate-pulse'}`}
            >
              <AlertTitle className="text-xl font-bold 1024:text-sm 1024:font-medium">
                {placeId
                  ? `${
                      type === 0 ? 'Полка зафиксирована' : 'Поддон зафиксирован'
                    } (${placeId})`
                  : 'Место не зафиксировано'}
              </AlertTitle>
            </Alert>

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
    </div>
  )
}
