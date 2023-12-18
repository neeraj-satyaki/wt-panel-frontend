import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'

export function SearchPanel({
  q,
  setQ,
  handleSearch,
  isFetching,
}: {
  q: string
  setQ: Function
  handleSearch: () => void
  isFetching: boolean
}) {
  return (
    <form
      className="flex w-full justify-between gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="bg-white w-full flex justify-between gap-2 items-center">
        <Input
          placeholder="Поиск заявок и продаж"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          disabled={isFetching}
          className="w-full"
        />
        {q.length > 0 && (
          <div className="cursor-pointer text-sm" onClick={() => setQ('')}>
            Очистить
          </div>
        )}
      </div>
      <Button variant="default" onClick={() => handleSearch()} disabled={isFetching}>
        {isFetching ? <UiSpinner /> : 'Найти'}
      </Button>
    </form>
  )
}
