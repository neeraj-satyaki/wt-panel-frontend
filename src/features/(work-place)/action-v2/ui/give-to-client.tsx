import { useMoveAppSale } from '@/entities/panel-v2'
import { Button } from '@/shared/ui/components/ui/button'

type Props = {
  id: string
  disabled?: boolean
}

export function GiveToClient({ id, disabled }: Props) {
  const moveAppSale = useMoveAppSale()
  return (
    <Button
      className="text-xl font-semibold h-14"
      disabled={moveAppSale.isPending || disabled}
      variant="primary"
      onClick={() =>
        moveAppSale.mutate({
          id: id,
          processing: 'Заказ получен',
          sub_processing: '0',
          type: 'Продажа',
          move_myself: false,
          comment_for_collector: '',
        })
      }
    >
      {moveAppSale.isPending ? 'Загрузка...' : 'Отдать клиенту'}
    </Button>
  )
}
