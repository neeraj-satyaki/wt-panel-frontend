import { UiTextField } from '@/shared/ui/components/ui-text-field'

export const SearchPanel = ({ q, setQ }: { q: string; setQ: Function }) => {
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
