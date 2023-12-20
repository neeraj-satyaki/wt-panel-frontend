import { MovingProduct } from '@/features/(moving)/moving-product'
import { MovingPallete } from '@/features/(moving)/moving-pallete'
import { UiHeading } from '@/shared/ui/components/ui-heading'

export function Moving() {
  return (
    <div className="flex gap-2">
      <UiHeading level="1">Перемещение</UiHeading>
      <MovingProduct />
      <MovingPallete />
    </div>
  )
}
