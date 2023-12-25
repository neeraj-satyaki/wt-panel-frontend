import { authProtectedPage } from '@/features/auth'
import { CatalogPage } from '@/pages/catalog'
import Head from 'next/head'

function Catalog() {
  return (
    <>
      <Head>
        <title>Каталог</title>
      </Head>
      <CatalogPage />
    </>
  )
}

export default authProtectedPage(Catalog)
