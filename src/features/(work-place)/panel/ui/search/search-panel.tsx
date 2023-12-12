import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'

type Props = {
  q: string
  setQ: (text: string) => void
  handleSearch: () => void
  isFetching: boolean
}

export function SearchPanel({ q, setQ, handleSearch, isFetching }: Props) {
  return (
    <form
      className="flex w-full justify-between gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        placeholder="Поиск заявок и продаж"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        disabled={isFetching}
        className="w-full"
      />
      <Button variant={'primary'} onClick={() => handleSearch()} disabled={isFetching}>
        {isFetching ? <UiSpinner /> : 'Найти'}
      </Button>
    </form>
  )
}
