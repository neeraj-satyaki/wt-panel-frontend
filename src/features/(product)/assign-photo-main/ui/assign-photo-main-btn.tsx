import { useAssignMainPhoto } from '@/entities/products/api'
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
      className="whitespace-pre-wrap"
      disabled={assignPhotoMain.isPending}
      variant="primary"
      onClick={() =>
        assignPhotoMain.mutate({
          productId: productId,
          type: type,
          imageUrl: imageUrl,
        })
      }
    >
      {assignPhotoMain.isPending ? 'Загрузка...' : 'Сделать главной'}
    </Button>
  )
}
