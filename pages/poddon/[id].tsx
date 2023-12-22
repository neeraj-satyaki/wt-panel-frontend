import PoddonPage from '@/pages/poddon'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Poddon() {
  const router = useRouter()
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : (router.query.id as string)

  if (!id) return null

  return (
    <>
      <Head>
        <title>Поддон № {id}</title>
      </Head>
      <PoddonPage id={id} />
    </>
  )
}
