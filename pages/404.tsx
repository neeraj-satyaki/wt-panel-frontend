import { NotFoundPage } from '@/pages/not-found'
import Head from 'next/head'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <NotFoundPage />
    </>
  )
}
