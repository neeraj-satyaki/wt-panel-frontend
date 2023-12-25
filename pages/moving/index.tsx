import { authProtectedPage } from '@/features/auth'
import { MovingPage } from '@/pages/moving'
import Head from 'next/head'

function Moving() {
  return (
    <>
      <Head>
        <title>Перемещение</title>
      </Head>
      <MovingPage />
    </>
  )
}

export default authProtectedPage(Moving)
