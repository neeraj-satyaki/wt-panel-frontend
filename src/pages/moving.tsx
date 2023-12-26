import { HeaderLayoutWidget } from '@/widgets/header'
import { MovingWidget } from '@/widgets/moving-product'

export function MovingPage() {
  return (
    <HeaderLayoutWidget>
      <main className="space-y-4">
        <MovingWidget />
      </main>
    </HeaderLayoutWidget>
  )
}
