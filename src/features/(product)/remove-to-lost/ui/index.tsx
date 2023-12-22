import { useRemoveToLost } from '@/entities/products/api'
import { Button } from '@/shared/ui/components/ui/button'

type Props = {
  ids: string[]
}

export function RemoveToLostBtn({ ids }: Props) {
  const removeToLost = useRemoveToLost()

  const handleRemoveToLost = () => {
    removeToLost.mutate({ ids })
  }
  return (
    <div>
      <Button onClick={() => handleRemoveToLost()}>
        Отправить все товары в потерянные
      </Button>
    </div>
  )
}
