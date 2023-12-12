import { useMovingPalletState } from '../model/state'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'

export function ScannerMovePallete() {
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
      {palleteId.length === 0
        ? configureScanner(
            (decodedText: any, decodedResult: any) =>
              handleScanPalleteId(decodedText, decodedResult),
            `scanner-pallete-${palleteId}`, // Уникальный ключ для сканнера детали
          )
        : configureScanner(
            (decodedText: any, decodedResult: any) =>
              handleScanPlace(decodedText, decodedResult),
            `scanner-pallete-place-${palleteId}`, // Уникальный ключ для сканнера полки
          )}
    </div>
  )
}
