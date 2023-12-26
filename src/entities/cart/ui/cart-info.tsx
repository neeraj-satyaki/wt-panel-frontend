import { QRCodeSVG } from 'qrcode.react'
import { ReactNode } from 'react'

type Props = {
  cartId: string
  feature?: ReactNode
}

export function CartInfo({ cartId, feature }: Props) {
  return (
    <div className="flex flex-col gap-4 1024:flex-row">
      <div className="flex flex-col gap-4">
        <QRCodeSVG value={cartId} size={192} className="mx-auto" />
        {feature}
      </div>
    </div>
  )
}
