import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'

export default function ScannerFindProduct({
  close,
  successScan,
}: {
  close: Function
  successScan: Function
}) {
  return (
    <UiPageModalLayout close={() => close()}>
      <div className="w-full 1024:w-3/5 mx-auto">
        <Html5QrcodePlugin
          onSuccessScan={(decodeText: string) => successScan(decodeText, '')}
        />
      </div>
    </UiPageModalLayout>
  )
}
