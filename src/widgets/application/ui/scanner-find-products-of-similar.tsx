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
          onSuccessScan={(decodeText: string) => successScan(decodeText, '')}
        />
      </div>
    </UiPageModalLayout>
  )
}
