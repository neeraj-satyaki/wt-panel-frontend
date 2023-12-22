import { useGetPoddon } from '@/entities/poddon'
import { RemoveToLostBtn } from '@/features/(product)/remove-to-lost'
import LibPagination from '@/shared/lib/lib-pagination'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import ImageNotFound from '@/public/image-not-found.png'

export const PoddonWidget = ({ id }: { id: string }) => {
  const [page, setPage] = useState(1)
  const [count] = useState(12)
  const poddon = useGetPoddon(id, page.toString(), count.toString())
  useEffect(() => {
    poddon.refetch()
  }, [page])

  if (poddon.isLoading) {
    return <div>Загрузка</div>
  }
  if (poddon.isError) {
    return <div>Ошибка</div>
  }
  if (!poddon.data) {
    return <div>Нет данных</div>
  }
  if (!poddon.data.data.length) {
    return <UiHeading level={'1'}>Поддон №{id} пустой</UiHeading>
  }
  return (
    <div className="space-y-4">
      <UiHeading level={'1'}>
        Поддон №{id} <RemoveToLostBtn ids={poddon.data.info.ids} />
      </UiHeading>
      {poddon.isFetching && <div>Обновление</div>}
      <div className="space-y-8">
        <div className="grid grid-cols-1 1024:grid-cols-6 gap-4">
          {poddon.data.data.map((item, i) => {
            return (
              <div className="shadow" key={i}>
                <Image
                  src={item.photos[0] ?? ImageNotFound}
                  alt={''}
                  width={600}
                  height={600}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="p-2">
                  <div className="font-semibold">{item.name}</div>
                  <div>{item.article}</div>
                  <div>{item.place}</div>
                  <div>{item.poddon}</div>
                  <div>{item.indcode}</div>
                </div>
              </div>
            )
          })}
        </div>
        <LibPagination
          currentPage={page}
          totalPages={poddon.data.info.pages}
          nextPage={() => setPage(page + 1)}
          prevPage={() => setPage(page - 1)}
        />
      </div>
    </div>
  )
}
