import { authProtectedPage } from '@/features/auth'
import { ShelfPage } from '@/pages/shelf'
import Head from 'next/head'
import { useRouter } from 'next/router'

function Shelf() {
  const router = useRouter()
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : (router.query.id as string)

  return (
    <>
      <Head>
        <title>Полка № {id}</title>
      </Head>
      <ShelfPage id={id} />
    </>
  )
}

export default authProtectedPage(Shelf)
