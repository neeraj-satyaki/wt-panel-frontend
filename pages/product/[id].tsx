import { ProductPage } from '@/pages/product'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Product() {
  const router = useRouter()
  const id = Array.isArray(router.query.id)
    ? router.query.id[0]
    : (router.query.id as string)

  if (!id) return null

  return (
    <>
      <Head>
        <title>Продукт № {id}</title>
      </Head>
      <ProductPage id={id} />
    </>
  )
}
