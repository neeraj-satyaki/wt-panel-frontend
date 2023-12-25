import { authProtectedPage } from '@/features/auth'
import { MissedCallsPage } from '@/pages/work-place/missed-calls'
import Head from 'next/head'

function MissedCalls() {
  return (
    <>
      <Head>
        <title>Пропущенные звонки</title>
      </Head>
      <MissedCallsPage />
    </>
  )
}

export default authProtectedPage(MissedCalls)
