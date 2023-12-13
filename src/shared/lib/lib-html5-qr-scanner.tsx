import { Html5Qrcode } from 'html5-qrcode'
import { useEffect, useState } from 'react'
import { UiSpinner } from '../ui/components/ui-spinner'

export function Html5QrcodePlugin({
  onSuccessScan,
}: {
  onSuccessScan: (decodeText: string) => void
}) {
  const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const config = { fps: 10, qrbox: { width: 250, height: 250 } }

  useEffect(() => {
    const initializeQrCode = async () => {
      const qrCodeInstance = new Html5Qrcode('reader')
      setHtml5QrCode(qrCodeInstance)
    }

    initializeQrCode()
  }, [])

  useEffect(() => {
    if (html5QrCode) {
      html5QrCode
        .start({ facingMode: 'environment' }, config, onSuccessScan, (error) =>
          console.log(error),
        )
        .catch((error: any) => setError('Произошла ошибка'))
        .finally(() => {
          setLoading(false)
        })
    }

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop()
      }
    }
  }, [html5QrCode, onSuccessScan])

  return (
    <>
      {loading && (
        <div className="py-20 flex flex-col">
          <UiSpinner className="self-center" />
        </div>
      )}
      {error && <div>{error}</div>}
      <div id="reader" />
    </>
  )
}
