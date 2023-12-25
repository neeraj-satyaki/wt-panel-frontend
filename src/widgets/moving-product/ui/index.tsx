import { MovingProduct } from '@/features/(moving)/moving-product'
import { MovingPallete } from '@/features/(moving)/moving-pallete'
import { UiHeading } from '@/shared/ui/components/ui-heading'

export function Moving() {
  return (
    <div className="space-y-4">
      <UiHeading level="1">Перемещение</UiHeading>
      <div className="flex flex-col 1024:flex-row gap-2">
        <MovingProduct />
        <MovingPallete />
      </div>
    </div>
  )
}
