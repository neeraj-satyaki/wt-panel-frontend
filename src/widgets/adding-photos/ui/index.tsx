import { useGetProduct } from '@/entities/products/api'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useEffect } from 'react'
import { addingPhotosStore } from '../model/store'
import { Alert, AlertTitle } from '@/shared/ui/components/ui/alert'
import { ScannPoddonBlock } from './scann-poddon-block'
import { StepFour } from './step-four'
import { StepOne } from './step-one'
import { StepThree } from './step-three'
import { StepTwo } from './step-two'
import { EditProduct } from '@/features/(product)/edit-product'
import { AlertCircle } from 'lucide-react'

type Props = {}

export function AddingPhotosWidget({}: Props) {
  const { productId, step, paddonId } = addingPhotosStore()
  const product = useGetProduct(productId)

  useEffect(() => {
    if (productId) {
      product.refetch()
    }
  }, [productId])

  return (
    <div className="flex justify-start">
      <div className="p-4 shadow rounded-lg border-gray-100 border flex flex-col flex-start gap-4">
        <UiHeading level={'2'}>Добавление фото</UiHeading>
        <Alert variant="destructive" className="p-4 text-center">
          <AlertTitle className="m-0 flex items-center gap-2">
            <AlertCircle />
            Не забудь сменить паддон
          </AlertTitle>
        </Alert>
        <div className="flex items-center gap-2">
          <div>
            {paddonId ? `Поддон зафиксирован: ` : 'Зафиксировать поддон'}
            {paddonId && (
              <span className="bg-red-600 p-1 rounded text-white font-semibold">
                {paddonId}
              </span>
            )}
          </div>
          <ScannPoddonBlock />
        </div>
        {product.data && (
          <div className="self-start">
            <EditProduct
              id={product.data.indcode}
              comment={product.data.comment}
              cost={Number(product.data.cost.replace(/\s/g, ''))}
            />
          </div>
        )}
        {step === 1 && <StepOne product={product} />}
        {product.data && (
          <>
            {step === 2 && <StepTwo product={product} />}
            {step === 3 && <StepThree product={product} />}
            {step === 4 && <StepFour />}
          </>
        )}
      </div>
    </div>
  )
}
