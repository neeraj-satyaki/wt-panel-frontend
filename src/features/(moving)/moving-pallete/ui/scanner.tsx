import { UiHeading } from '@/shared/ui/components/ui-heading'
import { useMovingPalletState } from '../model/state'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'

export default function ScannerMoveProduct() {
  const { palleteId, handleScanPalleteId, handleScanPlace } = useMovingPalletState()

  const configureScanner = (qrCodeSuccessCallback: any, key: string) => (
    <Html5QrcodePlugin
      key={key}
      fps={10}
      qrbox={600}
      disableFlip={false}
      qrCodeSuccessCallback={qrCodeSuccessCallback}
    />
  )

  return (
    <div>
      <UiHeading level={'1'}>
        {palleteId.length === 0 ? `Отсканируйте паллет` : `Отсканируйте полку`}
      </UiHeading>

      {palleteId.length === 0
        ? configureScanner(
            (decodedText: any, decodedResult: any) =>
              handleScanPalleteId(decodedText, decodedResult),
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
