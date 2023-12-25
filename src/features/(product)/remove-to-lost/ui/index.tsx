import { useRemoveToLost } from '@/entities/products/api'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/components/ui/alert-dialog'
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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Очистить место</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
            <AlertDialogDescription>
              Всё товары на данном месте отправяться в потерянные
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Закрыть</AlertDialogCancel>
            <Button
              onClick={() => handleRemoveToLost()}
              disabled={removeToLost.isPending}
            >
              {removeToLost.isPending ? <UiSpinner /> : 'Очистить место'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
