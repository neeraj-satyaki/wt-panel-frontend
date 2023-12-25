import { authProtectedPage } from '@/features/auth'
import { PersonalAreaPage } from '@/pages/personal-area'
import Head from 'next/head'

function PersonalArea() {
  return (
    <>
      <Head>
        <title>Личный кабинет</title>
      </Head>
      <PersonalAreaPage />
    </>
  )
}

export default authProtectedPage(PersonalArea)
