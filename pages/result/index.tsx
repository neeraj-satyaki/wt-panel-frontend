import { authProtectedPage } from '@/features/auth'
import { ResultPage } from '@/pages/result'
import Head from 'next/head'
import { useRouter } from 'next/router'

function Result() {
  const router = useRouter()
  const type = router.query.type as string
  const text = router.query.text as string
  const productId = router.query.productId as string
  return (
    <>
      <Head>
        <title>
          {type === 'success' && 'Успех'}
          {type === 'error' && 'Ошибка'}
        </title>
      </Head>
      <ResultPage type={type} text={text} productId={productId} />
    </>
  )
}

export default authProtectedPage(Result)
