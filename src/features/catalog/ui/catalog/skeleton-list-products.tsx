import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'

export function SkeletonListProducts() {
  const blocks = Array.from({ length: 30 }, (_, index) => (
    <div key={index} className="flex flex-col col-span-2 w-full gap-2 desktop:col-span-1">
      <div className="flex flex-col h-52 bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="flex flex-col h-8 bg-gray-200 animate-pulse rounded-lg"></div>
      <div className="flex flex-col h-6 bg-gray-200 animate-pulse rounded-lg"></div>
    </div>
  ))
  return (
    <div className="flex flex-col gap-2">
      <div className="h-4 bg-gray-200 animate-pulse rounded-md w-32"></div>
      <UiListProductsLayout>{blocks}</UiListProductsLayout>
    </div>
  )
}
