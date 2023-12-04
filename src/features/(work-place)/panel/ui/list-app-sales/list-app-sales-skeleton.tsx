import { UiListAppSales } from '@/shared/ui/layouts/ui-list-products-app-sales'

export function ListAppSalesSkeleton() {
  const blocks = Array.from({ length: 20 }, (_, index) => (
    <div
      key={index}
      className="p-4 rounded-sm  bg-gray-100 flex flex-col gap-2 animate-pulse"
    >
      <div className="w-32 h-6 rounded-lg bg-gray-300"></div>
      <div className="w-24 h-6 rounded-lg bg-gray-300"></div>
      <div className="w-24 h-6 rounded-lg bg-gray-300"></div>
      <div className="flex gap-2">
        <div className="w-1/3 h-6 rounded-lg bg-gray-300"></div>
        <div className="w-1/3 h-6 rounded-lg bg-gray-300"></div>
      </div>
      <div className="w-32 h-8 rounded-lg bg-gray-300"></div>
    </div>
  ))

  return <UiListAppSales>{blocks}</UiListAppSales>
}
