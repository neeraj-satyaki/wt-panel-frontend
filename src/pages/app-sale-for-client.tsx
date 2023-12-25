import { AppForClient } from '@/widgets/app-sale-for-client'
import { SaleForClient } from '@/widgets/app-sale-for-client'

export function AppSaleForClientPage({ id, type }: { id: string; type: string }) {
  return (
    <main>
      {type === 'sale' ? (
        <SaleForClient id={id} />
      ) : type === 'application' ? (
        <AppForClient id={id} />
      ) : (
        <div>Ничего не найдено</div>
      )}
    </main>
  )
}
