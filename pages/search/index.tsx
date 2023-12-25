import { authProtectedPage } from '@/features/auth'
import { SearchPage } from '@/pages/search'
import Head from 'next/head'

function Search() {
  return (
    <>
      <Head>
        <title>Поиск</title>
      </Head>
      <SearchPage />
    </>
  )
}

export default authProtectedPage(Search)
