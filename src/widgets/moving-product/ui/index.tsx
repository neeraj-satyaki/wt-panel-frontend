import { MovingProduct } from '@/features/(moving)/moving-product'
import { MovingPallete } from '@/features/(moving)/moving-pallete'

export function Moving() {
  return (
    <div className="flex gap-2">
      <MovingProduct />
      <MovingPallete />
    </div>
  )
}
