import { useAssignMainPhoto } from '@/entities/products/api'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'

type Props = {
  productId: string
  type: string
  imageUrl: string
}

export function AssignPhotoMainBtn({ productId, type, imageUrl }: Props) {
  const assignPhotoMain = useAssignMainPhoto()

  return (
    <Button
      disabled={assignPhotoMain.isPending}
      variant="default"
      onClick={() =>
        assignPhotoMain.mutate({
          productId: productId,
          type: type,
          imageUrl: imageUrl,
        })
      }
    >
      {assignPhotoMain.isPending ? <UiSpinner /> : 'Сделать главной'}
    </Button>
  )
}
