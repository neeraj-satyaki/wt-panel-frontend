import { authProtectedPage } from '@/features/auth'
import { InventoryPage } from '@/pages/inventory'
import Head from 'next/head'

function Inventory() {
  return (
    <>
      <Head>
        <title>Инвентаризация</title>
      </Head>
      <InventoryPage />
    </>
  )
}

export default authProtectedPage(Inventory)
