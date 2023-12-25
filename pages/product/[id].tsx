import { authProtectedPage } from '@/features/auth'
import { ProductPage } from '@/pages/product'
import Head from 'next/head'
import { useRouter } from 'next/router'

function Product() {
  const router = useRouter()
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : (router.query.id as string)

  return (
    <>
      <Head>
        <title>Продукт № {id}</title>
      </Head>
      <ProductPage id={id} />
    </>
  )
}

export default authProtectedPage(Product)
