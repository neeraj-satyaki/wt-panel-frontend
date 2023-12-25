import { authProtectedPage } from '@/features/auth'
import { RefusesPage } from '@/pages/work-place/refuses'
import Head from 'next/head'

function Refuses() {
  return (
    <>
      <Head>
        <title>Отказы</title>
      </Head>
      <RefusesPage />
    </>
  )
}

export default authProtectedPage(Refuses)
