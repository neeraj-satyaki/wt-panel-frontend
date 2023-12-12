import { MovingProduct } from '@/features/(moving)'
import { MovingPallete } from '@/features/(moving)'

export function Moving() {
  return (
    <div className="flex gap-2">
      <MovingProduct />
      <MovingPallete />
    </div>
  )
}
