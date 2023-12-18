import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
import { useSimilarProductsForChangeStore } from '../model/store'
import { useGetSimilarProducts } from '@/entities/products/api'

export function Search({ code }: { code: string }) {
  const { q, setQ, page, count } = useSimilarProductsForChangeStore()
  const similarProducts = useGetSimilarProducts(code, page, count, q)
  const handleSearch = () => {
    similarProducts.refetch()
  }
  const clearSearchQuery = () => {
    setQ('')
    similarProducts.refetch()
  }
  return (
    <div>
      <form
        className="flex gap-2 w-full items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          placeholder="Введите индкод товара"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full"
        />
        {q.length > 0 && (
          <div
            className="text-sm text-gray-500 cursor-pointer"
            onClick={() => clearSearchQuery()}
          >
            очистить
          </div>
        )}
        <Button variant="primary" onClick={() => handleSearch()}>
          Найти
        </Button>
      </form>
    </div>
  )
}
