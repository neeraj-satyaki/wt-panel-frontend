import { useMoveAppSale } from '@/entities/panel-v2'
import { Button } from '@/shared/ui/components/ui/button'

type Props = {
  id: string
  processing: string
  availability_of_photos: boolean
}

export function Complete({ id, processing, availability_of_photos }: Props) {
  const moveAppSale = useMoveAppSale()

  return (
    <Button
      disabled={availability_of_photos || moveAppSale.isPending}
      variant="primary"
      onClick={() =>
        moveAppSale.mutate({
          id: id,
          processing: processing,
          sub_processing: '3',
          type: 'Заявка',
          move_myself: true,
          comment_for_collector: '',
        })
      }
    >
      {moveAppSale.isPending ? 'Загрузка...' : 'Закончить'}
    </Button>
  )
}
