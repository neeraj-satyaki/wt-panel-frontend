import { useMoveAppSale } from '@/entities/panel-v2'
import { Button } from '@/shared/ui/components/ui/button'
import React from 'react'

type Props = {
  id: string
  disabled?: boolean
}

export function CreateAppBtn({ id, disabled }: Props) {
  const moveAppSale = useMoveAppSale()
  return (
    <Button
      className="text-2xl font-semibold h-16"
      disabled={moveAppSale.isPending || disabled}
      variant="primary"
      onClick={() =>
        moveAppSale.mutate({
          id: id,
          processing: 'Заявка',
          sub_processing: '0',
          type: 'Заявка',
          move_myself: true,
          comment_for_collector: '',
        })
      }
    >
      {moveAppSale.isPending ? 'Загрузка...' : 'В работу'}
    </Button>
  )
}
