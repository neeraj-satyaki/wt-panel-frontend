import { UiHeading } from '@/shared/ui/components/ui-heading'
import { Alert, AlertTitle } from '@/shared/ui/components/ui/alert'
import { ScannPoddon } from './scan-poddon-btn'
import { useProcessInventory } from '../model/store'
import { ScannProduct } from './scan-product'
import { SearchPoddon } from '@/features/(search)/search-poddon'
import { ScannShelf } from './scan-shelf-btn'
import { useEffect } from 'react'

export function InventoryProcessWidget() {
  const { placeId, type, changePlaceId } = useProcessInventory()

  useEffect(() => {
    changePlaceId('', 0)
  }, [])

  return (
    <div>
      <UiHeading level={'2'}>Процесс инвентаризации</UiHeading>
      <div className="border p-4 rounded-lg shadow max-w-[450px] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <SearchPoddon />
          <Alert variant="destructive" className="p-4 text-center">
            <AlertTitle className="text-xl font-bold 1024:text-sm 1024:font-semibold">
              Не забудь сменить место
            </AlertTitle>
          </Alert>
          <Alert
            variant={placeId ? 'default' : 'destructive'}
            className={`p-4 text-center border-2 ${
              placeId ? 'text-green-500 border-green-500' : 'animate-pulse duration-700'
            }`}
          >
            <AlertTitle className="text-xl font-bold 1024:text-sm 1024:font-semibold">
              {placeId
                ? `${
                    type === 0 ? 'Полка зафиксирована' : 'Поддон зафиксирован'
                  } (${placeId})`
                : 'Место не зафиксировано'}
            </AlertTitle>
          </Alert>
        </div>
        <div className="flex flex-col gap-2 1024:flex-row flex-wrap justify-between">
          <ScannPoddon />
          <ScannShelf />
        </div>
        <ScannProduct />
      </div>
    </div>
  )
}
