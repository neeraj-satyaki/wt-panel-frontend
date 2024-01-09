import { authProtectedPage } from '@/features/auth'
import { DesktopPage } from '@/pages/desktop'
import Head from 'next/head'

function Desktop() {
  return (
    <>
      <Head>
        <title>Рабочий стол</title>
      </Head>
      <DesktopPage />
    </>
  )
}

export default authProtectedPage(Desktop)
