import { routes } from '@/shared/constants/routing'
import { encodeDecodeText } from '@/shared/lib/lib-endode-decode-text'
import { Button } from '@/shared/ui/components/ui/button'

type Props = {
  id: string
}

export function SendToCLient({ id }: Props) {
  function copyUrlForClientOnMobile() {
    navigator.share({
      text: 'Здравствуйте, ознакомтесь с вашим заказом!: ',
      url: `${window.location.origin}${routes.APP_SALE_FOR_CLIENT}/${encodeDecodeText(
        id,
        'encode',
        'text-for-code',
      )}?type=application`,
    })
  }

  return (
    <Button
      variant={'primary'}
      onClick={() => copyUrlForClientOnMobile()}
      className="block 1024:hidden"
    >
      Отправить клиенту
    </Button>
  )
}
