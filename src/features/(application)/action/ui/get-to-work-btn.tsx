import { useMoveAppSale } from '@/entities/panel-v2'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'

type Props = {
  id: string
  processing: string
}

export function GetToWork({ id, processing }: Props) {
  const moveAppSale = useMoveAppSale()

  return (
    <Button
      disabled={moveAppSale.isPending}
      variant="default"
      onClick={() =>
        moveAppSale.mutate({
          id: id,
          processing: processing,
          sub_processing: '2',
          type: 'Заявка',
          move_myself: true,
          comment_for_collector: '',
        })
      }
    >
      {moveAppSale.isPending ? <UiSpinner /> : 'Взять в работу'}
    </Button>
  )
}
