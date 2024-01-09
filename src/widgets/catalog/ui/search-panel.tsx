import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
import { useListProductsState } from '../model/store'
import { ProductsResponse } from '@/shared/api/generated'
import { UseQueryResult } from '@tanstack/react-query'

export function SearchPanel({
  products,
}: {
  products: UseQueryResult<ProductsResponse, Error>
}) {
  const { q, setQ } = useListProductsState()
  return (
    <form
      className="flex w-full justify-between gap-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="bg-white w-full flex justify-between gap-2 items-center border-2 rounded-lg pr-2">
        <Input
          placeholder="Найти деталь"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full h-full text-lg 1024:text-sm border-none"
          disabled={products.isFetching}
        />
        {q.length > 0 && (
          <div className="cursor-pointer" onClick={() => setQ('')}>
            Очистить
          </div>
        )}
      </div>
      <Button
        disabled={products.isFetching}
        variant="primary"
        className="text-xl py-6 font-semibold 1024:text-sm 1024:py-4"
        onClick={() => products.refetch()}
      >
        {products.isFetching ? 'Загрузка...' : 'Найти'}
      </Button>
    </form>
  )
}
