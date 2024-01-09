import { authProtectedPage } from '@/features/auth'
import { ErrorPage } from '@/pages/error'
import Head from 'next/head'

function Error() {
  return (
    <>
      <Head>
        <title>Ошибка</title>
      </Head>
      <ErrorPage />
    </>
  )
}

export default authProtectedPage(Error)
