import { useMoveAppSale } from '@/entities/panel-v2'
import { Button } from '@/shared/ui/components/ui/button'
import React from 'react'

type Props = {
  id: string
  processing: string
}

export function BackToWork({ id, processing }: Props) {
  const moveAppSale = useMoveAppSale()

  return (
    <Button
      variant={'primary'}
      onClick={() =>
        moveAppSale.mutate({
          id: id,
          processing: processing,
          sub_processing: '1',
          type: 'Заявка',
          move_myself: false,
          comment_for_collector: '',
        })
      }
    >
      Вернуть в работу
    </Button>
  )
}
