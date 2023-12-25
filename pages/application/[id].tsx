import { authProtectedPage } from '@/features/auth'
import { ApplicationPage } from '@/pages/application'
import Head from 'next/head'
import { useRouter } from 'next/router'

function Application() {
  const router = useRouter()
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : (router.query.id as string)

  return (
    <>
      <Head>
        <title>Заявка {id}</title>
      </Head>
      <ApplicationPage id={id} />
    </>
  )
}

export default authProtectedPage(Application)
