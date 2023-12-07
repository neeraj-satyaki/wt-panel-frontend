import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'

export default function ScannerFindProductOfSimilar({
  close,
  successScan,
}: {
  close: Function
  successScan: Function
}) {
  return (
    <UiPageModalLayout close={() => close()}>
      <div className="w-full">
        <Html5QrcodePlugin
          fps={10}
          qrbox={500}
          disableFlip={false}
          qrCodeSuccessCallback={(decodedText: any, decodedResult: any) =>
            successScan(decodedText, decodedResult)
          }
        />
      </div>
    </UiPageModalLayout>
  )
}
