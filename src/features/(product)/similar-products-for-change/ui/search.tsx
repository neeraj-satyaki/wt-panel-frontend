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
          disabled={similarProducts.isFetching}
        />
        {q.length > 0 && (
          <button
            type="button" // Указывает, что это не submit кнопка
            disabled={similarProducts.isFetching}
            className="text-sm text-gray-500"
            onClick={() => clearSearchQuery()} // Вызываем функцию для очистки и refetch
          >
            очистить
          </button>
        )}
        <Button
          variant="primary"
          onClick={() => handleSearch()}
          disabled={similarProducts.isFetching}
        >
          Найти
        </Button>
      </form>
    </div>
  )
}
