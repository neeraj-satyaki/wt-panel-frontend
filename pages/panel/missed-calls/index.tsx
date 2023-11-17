import { MissedCallsPage } from '@/pages/panel/missed-calls'
import Head from 'next/head'

export default function MissedCalls() {
  return (
    <>
      <Head>
        <title>Пропущенные звонки</title>
      </Head>
      <MissedCallsPage />
    </>
  )
}
