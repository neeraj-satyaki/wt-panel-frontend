import { routes } from '@/shared/constants/routing'
import { encodeDecodeText } from '@/shared/lib/lib-endode-decode-text'
import { Button } from '@/shared/ui/components/ui/button'
import { useRouter } from 'next/router'

type Props = {
  id: string
}

export function PageForClient({ id }: Props) {
  const router = useRouter()

  function goToAppSaleForCLientPage() {
    router.push(
      `${window.location.origin}${routes.APP_SALE_FOR_CLIENT}/${encodeDecodeText(
        id,
        'encode',
        'text-for-code',
      )}?type=application`,
    )
  }
  return (
    <Button
      variant={'primary'}
      onClick={() => goToAppSaleForCLientPage()}
      className="hidden 1024:block"
    >
      Страница для клиента
    </Button>
  )
}
