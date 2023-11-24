import { UiTextField } from '@/shared/ui/components/ui-text-field'

type Props = {
  q: string
  setQ: (text: string) => void
}

export function SearchPanel({ q, setQ }: Props) {
  return (
    <UiTextField
      inputProps={{
        placeholder: 'Найти',
        value: q,
        onChange: (e) => setQ(e.target.value),
      }}
      className="w-full"
    />
  )
}
