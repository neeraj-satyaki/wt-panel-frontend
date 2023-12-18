import { useMovingPalletState } from '../model/state'
import { Button } from '@/shared/ui/components/ui/button'

import { DialogPallete } from './dialog-pallete'
import { DialogPlace } from './dialog-place'

export function ScannerMovePallete({ handleSubmit }: { handleSubmit: () => void }) {
  const {
    palleteId,
    handleScanPalleteId,
    handleScanPlace,
    place,
    clearPallete,
    clearPlace,
  } = useMovingPalletState()

  return (
    <div className="space-y-2">
      <div>
        <div>Паллет: {palleteId}</div>
        <DialogPallete
          palleteId={palleteId}
          handleScanPalleteId={handleScanPalleteId}
          clearPallete={clearPallete}
        />
      </div>
      <div>
        <div>Полка: {place}</div>
        <DialogPlace
          placeId={place}
          handleScanPlace={handleScanPlace}
          clearPlace={clearPlace}
        />
      </div>
      <Button
        variant={'primary'}
        disabled={!palleteId || !place}
        onClick={() => handleSubmit()}
      >
        Переместить
      </Button>
    </div>
  )
}
