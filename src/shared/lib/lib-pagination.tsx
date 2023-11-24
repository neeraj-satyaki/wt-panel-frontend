import { UiButton } from '../ui/components/ui-button'

type Props = {
  currentPage: number
  totalPages: number
  nextPage: Function
  prevPage: Function
}
export function LibPagination({ currentPage, totalPages, nextPage, prevPage }: Props) {
  return (
    <div className={`w-full flex justify-center gap-2 flex-col items-center `}>
      <span className="text-sm">
        {currentPage}/{totalPages}
      </span>
      <div className="flex gap-2">
        <UiButton
          disabled={currentPage === 1}
          variant="primary"
          onClick={() => prevPage()}
          className="px-4 py-2 text-sm"
        >
          Предыдущая
        </UiButton>
        <UiButton
          disabled={currentPage === totalPages}
          variant="primary"
          onClick={() => nextPage()}
          className="px-4 py-2 text-sm"
        >
          Следующая
        </UiButton>
      </div>
    </div>
  )
}
