import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { IconCross } from '@/shared/ui/icons/icon-cross'

export default function ScannerFindProduct({
  close,
  successScan,
}: {
  close: Function
  successScan: Function
}) {
  return (
    <div
      className="w-full fixed top-0 left-0 min-h-screen bg-black/50 backdrop-blur-sm z-20 flex justify-center items-center"
      onClick={() => close()}
    >
      <button className="absolute right-6 top-6 text-white">
        <IconCross />
      </button>
      <div className="w-1/2 bg-white" onClick={(e) => e.stopPropagation()}>
        <Html5QrcodePlugin
          fps={10}
          qrbox={500}
          disableFlip={false}
          qrCodeSuccessCallback={(decodedText: any, decodedResult: any) =>
            successScan(decodedText, decodedResult)
          }
        />
      </div>
    </div>
  )
}
