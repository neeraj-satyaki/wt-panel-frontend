import { authProtectedPage } from '@/features/auth'
import { PoddonPage } from '@/pages/poddon'
import Head from 'next/head'
import { useRouter } from 'next/router'

function Poddon() {
  const router = useRouter()
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : (router.query.id as string)

  return (
    <>
      <Head>
        <title>Поддон № {id}</title>
      </Head>
      <PoddonPage id={id} />
    </>
  )
}

export default authProtectedPage(Poddon)
