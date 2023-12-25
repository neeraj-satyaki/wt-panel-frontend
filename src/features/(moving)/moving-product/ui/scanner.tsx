import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { useMovingProductState } from '../model/store'

import { Button } from '@/shared/ui/components/ui/button'
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'
import { useGetProduct } from '@/entities/products/api'
import { ProductCard } from '@/entities/products/ui/product-card'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

export default function ScannerMoveProduct({
  handleSubmit,
}: {
  handleSubmit: () => void
}) {
  const {
    productId,
    handleScanProductId,
    handleScanPlace,
    type,
    setType,
    place,
    clearProduct,
    clearPlace,
  } = useMovingProductState()
  const product = useGetProduct(productId)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button
          variant={type === 0 ? 'default' : 'outline'}
          onClick={() => setType(0)}
          className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
        >
          На полку
        </Button>
        <Button
          variant={type === 1 ? 'default' : 'outline'}
          onClick={() => setType(1)}
          className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
        >
          На поддон
        </Button>
      </div>
      <div className="space-y-2">
        <div className="flex flex-col 1024:block">
          <div className="text-lg font-semibold">Деталь: {productId}</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="text-xl py-7 font-semibold 1024:text-sm 1024:py-4"
              >
                Сканировать деталь
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[800px] w-full">
              <DialogHeader>
                <DialogTitle>Отсканируйте деталь</DialogTitle>
              </DialogHeader>

              {!productId ? (
                <Html5QrcodePlugin
                  fps={10}
                  qrbox={250}
                  disableFlip={false}
                  qrCodeSuccessCallback={handleScanProductId}
                />
              ) : (
                <>
                  <div>Деталь отсканирована {productId}</div>
                  {product.isLoading && <UiSpinner />}
                  {product.data && <ProductCard data={product.data} />}
                  <Button
                    onClick={() => clearProduct()}
                    className="text-lg py-6 font-semibold 1024:text-sm 1024:py-4"
                  >
                    Заменить на другую деталь
                  </Button>
                </>
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Ок
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col 1024:block">
          <div className="text-lg font-semibold">Полка: {place}</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="text-xl py-7 font-semibold 1024:text-sm 1024:py-4"
              >
                {type === 0 ? 'Сканировать полку' : 'Сканировать поддон'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[800px] w-full">
              <DialogHeader>
                <DialogTitle>Отсканируйте полку</DialogTitle>
              </DialogHeader>
              {!place ? (
                <Html5QrcodePlugin
                  fps={10}
                  qrbox={250}
                  disableFlip={false}
                  qrCodeSuccessCallback={handleScanPlace}
                />
              ) : (
                <>
                  <div>Деталь отсканирована {place}</div>
                  <Button onClick={() => clearPlace()}>Заменить на другую деталь</Button>
                </>
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Ок
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Button
        variant="default"
        className="text-xl py-7 font-semibold 1024:text-sm 1024:py-4"
        disabled={!productId || !place}
        onClick={() => handleSubmit()}
      >
        Переместить
      </Button>
    </div>
  )
}
