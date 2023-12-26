import { useMovingPalletState } from '../model/store'
import { Button } from '@/shared/ui/components/ui/button'

import { DialogPallete } from './dialog-pallete'
import { DialogPlace } from './dialog-place'
import { useMovePallete } from '@/entities/products/api'
import { useEffect } from 'react'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'

export function ScannerMovePallete({ show }: { show: boolean }) {
  const { palleteId, place, setResult, resetValues, result, step } =
    useMovingPalletState()
  const movePallete = useMovePallete()

  function handleSubmit() {
    if (place.length > 0 && palleteId.length > 0) {
      movePallete.mutate({ pallet: palleteId, place: place })
      setResult(true)
    }
  }
  useEffect(() => {
    if (place) {
      handleSubmit()
    }
  }, [place])
  useEffect(() => {
    if (!show) {
      refresh()
    }
  }, [show])
  const refresh = () => {
    movePallete.reset()
    resetValues()
  }

  return (
    <div className="flex flex-col gap-4">
      {result ? (
        <div className="flex flex-col">
          {movePallete.isPending && <UiSpinner />}
          {movePallete.isError && (
            <div className="text-2xl font-semibold text-center">
              <AnimateError />
              <div>Ошибка при перемещении паллета</div>
            </div>
          )}
          {movePallete.isSuccess && (
            <div className="text-2xl font-semibold text-center">
              <AnimateSuccess />
              <div>
                Место хранение изменено на <span className="font-bold">{place}</span>
              </div>
            </div>
          )}
          <Button
            variant="default"
            className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
            onClick={() => refresh()}
          >
            Заново
          </Button>
        </div>
      ) : (
        <>
          {palleteId && <div className="text-2xl font-semibold">{palleteId}</div>}
          {place && <div className="text-2xl font-semibold">{place}</div>}
          {step === 0 && <DialogPallete />}
          {step === 1 && <DialogPlace />}
        </>
      )}
    </div>
  )
}
