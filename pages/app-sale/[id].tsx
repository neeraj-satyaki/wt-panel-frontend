import { AppSalePage } from '@/pages/app-sale'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function AppSale() {
  const router = useRouter()
  const id = router.query.id
  if (!id) {
    return null
  }
  return (
    <>
      <Head>
        <title>Заявка/Продажа № {id}</title>
      </Head>
      <AppSalePage />
    </>
  )
}
