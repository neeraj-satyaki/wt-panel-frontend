import { ProductPage } from '@/pages/product'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Product() {
  const router = useRouter()
  const id = router.query.id
  if (!id) {
    return null
  }
  return (
    <>
      <Head>
        <title>Продукт № {id}</title>
      </Head>
      <ProductPage id={id} />
    </>
  )
}
