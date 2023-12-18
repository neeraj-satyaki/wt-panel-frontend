import { useMoveAppSale } from '@/entities/panel-v2'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'

type Props = {
  id: string
  disabled?: boolean
}

export function AssemblyBtnMyself({ id, disabled }: Props) {
  const moveAppSale = useMoveAppSale()
  return (
    <Button
      disabled={moveAppSale.isPending || disabled}
      variant="default"
      onClick={() =>
        moveAppSale.mutate({
          id: id,
          processing: 'Сборка',
          sub_processing: '2',
          type: 'Заявка',
          move_myself: true,
          comment_for_collector: '',
        })
      }
    >
      {moveAppSale.isPending ? <UiSpinner /> : 'Собрать самому'}
    </Button>
  )
}
