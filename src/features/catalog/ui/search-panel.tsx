import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
import { X } from 'lucide-react'

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
          placeholder="Найти деталь"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          disabled={isFetching}
          className="w-full h-full text-lg 1024:text-sm"
        />
        {q.length > 0 && (
          <div
            className="cursor-pointer text-lg font-semibold 1024:text-sm 1024:py-4"
            onClick={() => setQ('')}
          >
            <X />
          </div>
        )}
      </div>
      <Button
        variant="default"
        onClick={() => handleSearch()}
        disabled={isFetching}
        className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
      >
        {isFetching ? <UiSpinner /> : 'Найти'}
      </Button>
    </form>
  )
}
