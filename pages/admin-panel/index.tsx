import { adminProtectedPage } from '@/features/auth'
import { AdminPanelMainPage } from '@/pages/admin-panel/main'
import Head from 'next/head'

function Panel() {
  return (
    <>
      <Head>
        <title>Панель</title>
      </Head>
      <AdminPanelMainPage />
    </>
  )
}

export default adminProtectedPage(Panel)
