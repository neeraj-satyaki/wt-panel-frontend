import { useMovingPalletState } from '../model/store'
import { Button } from '@/shared/ui/components/ui/button'

import { DialogPallete } from './dialog-pallete'
import { DialogPlace } from './dialog-place'

export default function ScannerMovePallete({
  handleSubmit,
}: {
  handleSubmit: () => void
}) {
  const {
    palleteId,
    handleScanPalleteId,
    handleScanPlace,
    place,
    clearPallete,
    clearPlace,
  } = useMovingPalletState()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="text-lg font-semibold">Паллет: {palleteId}</div>
        <DialogPallete
          palleteId={palleteId}
          handleScanPalleteId={handleScanPalleteId}
          clearPallete={clearPallete}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-semibold">Полка: {place}</div>
        <DialogPlace
          placeId={place}
          handleScanPlace={handleScanPlace}
          clearPlace={clearPlace}
        />
      </div>
      <Button
        className="text-lg font-semibold py-6"
        variant="default"
        disabled={!palleteId || !place}
        onClick={() => handleSubmit()}
      >
        Переместить
      </Button>
    </div>
  )
}
