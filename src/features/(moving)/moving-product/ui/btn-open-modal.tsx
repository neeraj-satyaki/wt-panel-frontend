import { UiButton } from '@/shared/ui/components/ui-button'
import { useMovingProductState } from '../model/state'

export function BtnOpenModal() {
  const { handleOpen } = useMovingProductState()
  return (
    <UiButton variant={'primary'} className="px-4 py-2" onClick={() => handleOpen()}>
      Переместить деталь
    </UiButton>
  )
}
