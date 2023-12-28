import { Button } from '@/shared/ui/components/ui/button'
import { useMovingProductState } from '../model/store'

export function Filter() {
  const { setType, faketype, setFakeType } = useMovingProductState()
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant={faketype === 0 ? 'primary' : 'outline'}
        onClick={() => [setType(0), setFakeType(0)]}
        className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
      >
        На полку
      </Button>
      <Button
        variant={faketype === 1 ? 'primary' : 'outline'}
        onClick={() => [setType(1), setFakeType(1)]}
        className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
      >
        На поддон
      </Button>
      <Button
        variant={faketype === 2 ? 'primary' : 'outline'}
        onClick={() => [setType(0), setFakeType(2)]}
        className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
      >
        В корзину
      </Button>
    </div>
  )
}
