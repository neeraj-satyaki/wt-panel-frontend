import { useChangeProduct } from '@/entities/panel/queries'
import { Button } from '@/shared/ui/components/ui/button'
import { useSimilarProductsForChangeStore } from '../model/store'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

type Props = {
  appId: string
  pose: number
}

export function BtnChange({ appId, pose }: Props) {
  const { selectedProduct } = useSimilarProductsForChangeStore()
  const changeProduct = useChangeProduct()

  return (
    <Button
      disabled={changeProduct.isPending}
      className="sticky bottom-0"
      variant={'success'}
      onClick={() =>
        changeProduct.mutate({
          id: appId,
          indCode: selectedProduct,
          pose,
          type: 'Заявка',
        })
      }
    >
      {changeProduct.isPending ? <UiSpinner /> : 'Заменить'}
    </Button>
  )
}
