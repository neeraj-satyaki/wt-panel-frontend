import { AppForClientWidget } from '@/widgets/app-sale-for-client'
import { SaleForClientWidget } from '@/widgets/app-sale-for-client'

export function AppSaleForClientPage({ id, type }: { id: string; type: string }) {
  return (
    <main>
      {type === 'sale' ? (
        <SaleForClientWidget id={id} />
      ) : type === 'application' ? (
        <AppForClientWidget id={id} />
      ) : (
        <div>Ничего не найдено</div>
      )}
    </main>
  )
}
