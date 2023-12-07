import { encodeDecodeText } from '@/shared/lib/lib-endode-decode-text'
import Head from 'next/head'
import { useRouter } from 'next/router'
import AppSaleForClientPage from '@/pages/app-sale-for-client'

export default function AppSaleForClient() {
  const router = useRouter()
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : (router.query.id as string)
  if (!id) return null
  const decodeId = encodeDecodeText(id, 'decode', 'text-for-code')
  const type = router.query.type as string

  return (
    <>
      <Head>
        <title>{type === 'sale' ? 'Продажа' : 'Заявка'} для клиента</title>
      </Head>
      <div className="p-10">
        <AppSaleForClientPage id={decodeId} type={type} />
      </div>
    </>
  )
}
