import { authProtectedPage } from '@/features/auth'
import { SalePage } from '@/pages/sale'
import Head from 'next/head'
import { useRouter } from 'next/router'

export function Sale() {
  const router = useRouter()
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : (router.query.id as string)
  if (!id) return null

  return (
    <>
      <Head>
        <title>Продажа {id}</title>
      </Head>
      <SalePage id={id} />
    </>
  )
}

export default authProtectedPage(SalePage)
