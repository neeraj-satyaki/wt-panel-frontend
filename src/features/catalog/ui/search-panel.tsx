import { UiTextField } from '@/shared/ui/components/ui-text-field'

export function SearchPanel({ q, setQ }: { q: string; setQ: Function }) {
  return (
    <div className="flex justify-between gap-2 items-stretch">
      <UiTextField
        inputProps={{
          placeholder: 'Найти',
          value: q,
          onChange: (e) => setQ(e.target.value),
        }}
        className="w-full"
      />
    </div>
  )
}
