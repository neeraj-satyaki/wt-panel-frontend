import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'

export function SkeletonSimilarProducts() {
  const blocks = Array.from({ length: 14 }, (_, index) => (
    <div key={index} className="flex flex-col w-full gap-2 desktop:col-span-1">
      <div className="flex flex-col h-52 bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="flex flex-col h-8 bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="flex flex-col h-6 bg-gray-200 animate-pulse rounded-lg"></div>
    </div>
  ))
  return (
    <div className="flex gap-2 flex-col">
      <div className="bg-gray-200 animate-pulse h-6 w-52 rounded-lg"></div>
      <UiListProductsLayout>{blocks}</UiListProductsLayout>
    </div>
  )
}
