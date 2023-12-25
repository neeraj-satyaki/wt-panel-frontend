import Head from 'next/head'
import { PhotographerPanelPage } from '@/pages/photographer-panel'
import { authProtectedPage } from '@/features/auth'

function PhotographerPanel() {
  return (
    <>
      <Head>
        <title>Панель фотографа</title>
      </Head>
      <PhotographerPanelPage />
    </>
  )
}
export default authProtectedPage(PhotographerPanel)
