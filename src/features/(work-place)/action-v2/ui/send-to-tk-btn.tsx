import { useMoveAppSale } from '@/entities/panel-v2'
import { Button } from '@/shared/ui/components/ui/button'
import React from 'react'

type Props = {
  id: string
  disabled?: boolean
}

export function SendToTk({ id, disabled }: Props) {
  const moveAppSale = useMoveAppSale()
  return (
    <Button
      className="text-xl font-semibold h-14"
      disabled={moveAppSale.isPending || disabled}
      variant="primary"
      onClick={() =>
        moveAppSale.mutate({
          id: id,
          processing: 'Отправка в тк',
          sub_processing: '1',
          type: 'Продажа',
          move_myself: false,
          comment_for_collector: '',
        })
      }
    >
      {moveAppSale.isPending ? 'Загрузка...' : 'Отправить в тк'}
    </Button>
  )
}
