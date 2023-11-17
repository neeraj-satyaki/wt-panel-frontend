import { UiTextField } from '@/shared/ui/components/ui-text-field'

export function SearchPanel({ products }: { products: any }) {
  return (
    <div className="flex justify-between gap-2 items-stretch">
      <UiTextField
        inputProps={{
          placeholder: 'Найти',
          value: products.q,
          onChange: (e) => products.setQ(e.target.value),
        }}
        className="w-full"
      />
    </div>
  )
}
