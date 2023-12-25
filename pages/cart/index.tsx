import Head from 'next/head'
import { CartPage } from '@/pages/cart'
import { authProtectedPage } from '@/features/auth'

function Cart() {
  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>
      <CartPage />
    </>
  )
}
export default authProtectedPage(Cart)
