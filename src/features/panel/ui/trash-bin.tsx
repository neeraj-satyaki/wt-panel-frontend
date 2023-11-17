import { UiHeading } from '@/shared/ui/components/ui-heading'
import { NavigationPanel } from './navigation-panel'
import { useGetCancelsA } from '../model/use-cancels'
import { Table } from './table'

export function TrashBin() {
  const cancels = useGetCancelsA()
  return (
    <div className="flex flex-col gap-6">
      <div className="430:hidden">
        <UiHeading level={'5'}>Корзина</UiHeading>
      </div>
      <div className="hidden 430:block">
        <UiHeading level={'4'}>Корзина</UiHeading>
      </div>
      <NavigationPanel />
      <Table
        data={cancels.data}
        isLoading={cancels.isLoading}
        isError={cancels.isError}
        nextPage={cancels.nextPage}
        prevPage={cancels.prevPage}
        currentPage={cancels.currentPage}
      />
    </div>
  )
}
