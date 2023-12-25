import { authProtectedPage } from '@/features/auth'
import { PanelPage } from '@/pages/work-place/panel'
import Head from 'next/head'

function Panel() {
  return (
    <>
      <Head>
        <title>Панель</title>
      </Head>
      <PanelPage />
    </>
  )
}

export default authProtectedPage(Panel)
