import { HeaderLayout } from '@/widgets/header'
import { Moving } from '@/widgets/moving-product'

export function MovingPage() {
  return (
    <HeaderLayout>
      <main className="space-y-4">
        <Moving />
      </main>
    </HeaderLayout>
  )
}
