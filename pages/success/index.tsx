import { authProtectedPage } from '@/features/auth'
import { SuccessPage } from '@/pages/success'
import Head from 'next/head'

function Success() {
  return (
    <>
      <Head>
        <title>Успех</title>
      </Head>
      <SuccessPage />
    </>
  )
}

export default authProtectedPage(Success)
