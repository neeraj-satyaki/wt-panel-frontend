import { UiButton } from '@/shared/ui/components/ui-button'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiTextField } from '@/shared/ui/components/ui-text-field'

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
      <UiTextField
        inputProps={{
          placeholder: 'Поиск заявок и продаж',
          value: q,
          onChange: (e) => setQ(e.target.value),
          disabled: isFetching,
        }}
        className="w-full"
      />
      <UiButton
        variant={'primary'}
        className="px-4"
        onClick={() => handleSearch()}
        disabled={isFetching}
      >
        {isFetching ? <UiSpinner /> : 'Найти'}
      </UiButton>
    </form>
  )
}
