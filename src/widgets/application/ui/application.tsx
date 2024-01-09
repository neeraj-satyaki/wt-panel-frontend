import { ApplicationInfo, useGetApplication } from '@/entities/application'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { ProductCardApp } from '@/entities/products'
import AppFeatBlock from './app-feat-block'
import ProductFeatBlock from './product-feat-block'

export const ApplicationWidget = ({ id }: { id: string }) => {
  const application = useGetApplication(id)

  if (application.isLoading) return <div>Загрузка...</div>
  if (application.isError) return <div>Ошибка</div>
  if (!application.data) return <div>Данные не получены</div>

  return (
    <div className="flex flex-col gap-10">
      <ApplicationInfo
        app={application.data}
        feature={
          <>
            {application.isFetching ? (
              <div className="flex gap-2">
                <div className="bg-gray-200 animate-pulse w-32 h-10 rounded-lg"></div>
                <div className="bg-gray-200 animate-pulse w-32 h-10 rounded-lg"></div>
                <div className="bg-gray-200 animate-pulse w-32 h-10 rounded-lg"></div>
              </div>
            ) : (
              <AppFeatBlock application={application.data} id={id} />
            )}
          </>
        }
      />

      <div className="space-y-1">
        <UiHeading level={'2'}>Товары</UiHeading>
        <div className="grid grid-cols-2 gap-4 744:grid-cols-4 1024:grid-cols-6 1512:grid-cols-8">
          {application.data.data.map((item, i) => {
            return (
              <ProductCardApp
                data={item}
                key={i}
                feature={
                  <>
                    {application.data.info.sub_processing === 'Выполняется' && (
                      <>
                        {application.isFetching ? (
                          <div className="bg-gray-200 animate-pulse w-24 h-10 rounded-lg"></div>
                        ) : (
                          <ProductFeatBlock
                            item={item}
                            appId={application.data.info.id}
                          />
                        )}
                      </>
                    )}
                  </>
                }
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
