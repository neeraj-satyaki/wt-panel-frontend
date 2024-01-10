import { useMovingPalletState } from '../model/store'

import { DialogPallete } from './dialog-pallete'
import { DialogPlace } from './dialog-place'
import { useMovePallete } from '@/entities/products/api'
import { useEffect } from 'react'

export function ScannerMovePallete() {
  const { palleteId, place, resetValues, step } = useMovingPalletState()
  const movePallete = useMovePallete(palleteId, place)

  function handleSubmit() {
    if (place.length > 0 && palleteId.length > 0) {
      movePallete.mutate({ pallet: palleteId, place: place })
    }
    refresh()
  }

  useEffect(() => {
    if (place) {
      handleSubmit()
    }
  }, [place])

  const refresh = () => {
    movePallete.reset()
    resetValues()
  }

  return (
    <div className="flex flex-col gap-4">
      {palleteId && <div className="text-2xl font-semibold">{palleteId}</div>}
      {place && <div className="text-2xl font-semibold">{place}</div>}
      {step === 0 && <DialogPallete />}
      {step === 1 && <DialogPlace />}
    </div>
  )
}
