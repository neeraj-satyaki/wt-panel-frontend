import Head from 'next/head'
import CartPage from '@/pages/cart'
export default function Panel() {
  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>
      <CartPage />
    </>
  )
}
