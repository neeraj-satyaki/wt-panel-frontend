import { authProtectedPage } from '@/features/auth'
import { ReturnsPage } from '@/pages/work-place/returns'
import Head from 'next/head'

function Returns() {
  return (
    <>
      <Head>
        <title>Возвраты</title>
      </Head>
      <ReturnsPage />
    </>
  )
}

export default authProtectedPage(Returns)
