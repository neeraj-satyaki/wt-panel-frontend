import { ApplicationPage } from '@/pages/application'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Application() {
  const router = useRouter()
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : (router.query.id as string)
  if (!id) return null

  return (
    <>
      <Head>
        <title>Заявка {id}</title>
      </Head>
      <ApplicationPage id={id} />
    </>
  )
}
