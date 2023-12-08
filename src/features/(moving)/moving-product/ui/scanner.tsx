import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useMovingProductState } from '../model/state'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'

export default function ScannerMoveProduct() {
  const { productId, handleScanProductId, handleScanPlace, type } =
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
    <div>
      <UiHeading level={'1'}>
        {productId.length === 0
          ? `Отсканируйте деталь (Перемещение ${type === 1 ? 'на поддон' : 'на полку'})`
          : `Отсканируйте полку (Перемещение ${type === 1 ? 'на поддон' : 'на полку'})`}
      </UiHeading>

      {productId.length === 0
        ? configureScanner(
            (decodedText: any, decodedResult: any) =>
              handleScanProductId(decodedText, decodedResult),
            'scanner-product-id', // Уникальный ключ для сканнера детали
          )
        : configureScanner(
            (decodedText: any, decodedResult: any) =>
              handleScanPlace(decodedText, decodedResult),
            'scanner-place', // Уникальный ключ для сканнера полки
          )}
    </div>
  )
}
