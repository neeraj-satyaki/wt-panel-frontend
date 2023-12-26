import { Button } from '@/shared/ui/components/ui/button'
import { useMovingProductState } from '../model/store'

export function Filter() {
  const { type, setType } = useMovingProductState()
  return (
    <div className="flex gap-2">
      <Button
        variant={type === 0 ? 'default' : 'outline'}
        onClick={() => setType(0)}
        className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
      >
        На полку
      </Button>
      <Button
        variant={type === 1 ? 'default' : 'outline'}
        onClick={() => setType(1)}
        className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
      >
        На поддон
      </Button>
    </div>
  )
}
