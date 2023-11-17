import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'

export const SimilarProductsList = ({ id }: { id: string | string[] }) => {
  return (
    <div className="flex flex-col gap-2">
      <UiHeading level={'5'}>Похожие товары {id}</UiHeading>
      <UiListProductsLayout>
        <div></div>
      </UiListProductsLayout>
    </div>
  )
}
