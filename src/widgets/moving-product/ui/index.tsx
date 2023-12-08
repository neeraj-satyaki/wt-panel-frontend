import { MovingPallete } from '@/features/(moving)/moving-pallete'
import { MovingProduct } from '@/features/(moving)/moving-product'

export function Moving() {
  return (
    <div className="flex gap-2">
      <MovingProduct />
      <MovingPallete />
    </div>
  )
}
