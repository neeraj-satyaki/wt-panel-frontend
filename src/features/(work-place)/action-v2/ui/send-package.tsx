import { useMoveAppSale } from '@/entities/panel-v2'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'

type Props = {
  id: string
  disabled?: boolean
}

export function SendPackage({ id, disabled }: Props) {
  const moveAppSale = useMoveAppSale()
  return (
    <Button
      disabled={moveAppSale.isPending || disabled}
      variant="primary"
      onClick={() =>
        moveAppSale.mutate({
          id: id,
          processing: 'Упаковка',
          sub_processing: '1',
          type: 'Продажа',
          move_myself: false,
          comment_for_collector: '',
        })
      }
    >
      {moveAppSale.isPending ? <UiSpinner /> : 'Отправить на упаковку'}
    </Button>
  )
}
