import { useMovingProductState } from '../model/state'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'

import { Button } from '@/shared/ui/components/ui/button'

export function ScannerMoveProduct() {
  const { productId, handleScanProductId, handleScanPlace, type, setType } =
    useMovingProductState()

  const configureScanner = (qrCodeSuccessCallback: any, key: string) => (
    <Html5QrcodePlugin
      key={key} // Добавляем ключ для перерисовки компонента при изменении состояния
      fps={10}
      qrbox={600}
      disableFlip={false}
      qrCodeSuccessCallback={qrCodeSuccessCallback}
    />
  )

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Button
          variant={type === 0 ? 'primary' : 'outline'}
          onClick={() => setType(0)}
          disabled={productId.length > 0}
        >
          На полку
        </Button>
        <Button
          variant={type === 1 ? 'primary' : 'outline'}
          onClick={() => setType(1)}
          disabled={productId.length > 0}
        >
          На поддон
        </Button>
      </div>
      {productId.length === 0
        ? configureScanner(
            (decodedText: any, decodedResult: any) =>
              handleScanProductId(decodedText, decodedResult),
            `scanner-product-${productId}`, // Уникальный ключ для сканнера детали
          )
        : configureScanner(
            (decodedText: any, decodedResult: any) =>
              handleScanPlace(decodedText, decodedResult),
            `scanner-product-place-${productId}`, // Уникальный ключ для сканнера полки
          )}
    </div>
  )
}
