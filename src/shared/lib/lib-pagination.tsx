import { Button } from '../ui/components/ui/button'

type Props = {
  currentPage: number
  totalPages: number
  nextPage: Function
  prevPage: Function
}
export default function LibPagination({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}: Props) {
  return (
    <div className={`w-full flex justify-center gap-2 flex-col items-center`}>
      <span className="text-xl font-medium 1024:text-lg 1280:text-sm">
        {currentPage}/{totalPages}
      </span>
      <div className="flex gap-2">
        <Button disabled={currentPage === 1} variant="primary" onClick={() => prevPage()}>
          Назад
        </Button>
        <Button
          disabled={currentPage === totalPages}
          variant="primary"
          onClick={() => nextPage()}
        >
          Вперёд
        </Button>
      </div>
    </div>
  )
}
