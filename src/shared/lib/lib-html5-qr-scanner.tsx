import { Html5QrcodeScanner } from 'html5-qrcode'
import { useId } from 'react'
import { useEffect } from 'react'

const createConfig = (props: any) => {
  let config: any = {}
  if (props.fps) config.fps = props.fps
  if (props.qrbox) config.qrbox = props.qrbox
  if (props.aspectRatio) config.aspectRatio = props.aspectRatio
  if (props.disableFlip !== undefined) config.disableFlip = props.disableFlip
  return config
}

export function Html5QrcodePlugin(props: any) {
  const qrcodeRegionId = useId()
  useEffect(() => {
    const config = createConfig(props)
    const verbose = props.verbose === true
    if (!props.qrCodeSuccessCallback) throw 'qrCodeSuccessCallback is required callback.'

    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose)
    html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback)

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner. ', error)
      })
    }
  }, [props])

  return <div id={qrcodeRegionId} />
}
