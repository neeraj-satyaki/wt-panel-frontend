import { ServerErrorPage } from '@/pages/server-error'
import Head from 'next/head'

export default function ServerError() {
  return (
    <>
      <Head>
        <title>500</title>
      </Head>
      <ServerErrorPage />
    </>
  )
}
