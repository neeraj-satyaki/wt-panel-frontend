import { UiHeading } from '@/shared/ui/components/ui-heading'
import { Alert, AlertTitle } from '@/shared/ui/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { ScannPoddon } from './scan-poddon-btn'
import { useProcessInventory } from '../model/store'
import { ScannProduct } from './scan-product'
import { SearchPoddon } from '@/features/(search)/search-poddon'

export function InventoryProcessWidget() {
  const { poddonId } = useProcessInventory()

  return (
    <div>
      <UiHeading level={'2'}>Процесс инвентаризации</UiHeading>
      <div className="border max-w-[400px] w-full p-4 space-y-2 rounded-lg shadow">
        <div>
          <SearchPoddon />
        </div>
        <Alert variant="destructive" className="p-4 text-center">
          <AlertTitle className="m-0 flex items-center gap-2">
            <AlertCircle />
            Не забудь сменить паддон
          </AlertTitle>
        </Alert>
        <div className="space-y-2">
          {poddonId ? `Поддон зафиксирован (${poddonId})` : 'Поддон не зафиксирован'}
          <ScannPoddon />

          <ScannProduct />
        </div>
      </div>
    </div>
  )
}
