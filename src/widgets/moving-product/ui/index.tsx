import { MovingProduct } from '@/features/(moving)/moving-product'
import { MovingPallete } from '@/features/(moving)/moving-pallete'
import { UiHeading } from '@/shared/ui/components/ui-heading'

export function Moving() {
  return (
    <div className="space-y-4">
      <UiHeading level="1">Перемещение</UiHeading>
      <div className="space-y-2 1024:space-x-2">
        <MovingProduct />
        <MovingPallete />
      </div>
    </div>
  )
}
