import { UiButton } from '@/shared/ui/components/ui-button'
import { useMovingPalletState } from '../model/state'

export function BtnOpenModal() {
  const { handleOpen } = useMovingPalletState()
  return (
    <UiButton variant={'primary'} className="px-4 py-2" onClick={() => handleOpen()}>
      Переместить паллет
    </UiButton>
  )
}
