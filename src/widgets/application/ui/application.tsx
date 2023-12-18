import { ApplicationInfo, useGetApplication } from '@/entities/application'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { InvoicePrintring } from '../../../features/(application)/payment-account-printing/ui/invoice-printing'
import { FormCreateCheck } from '@/features/(application)/form-create-check'
import {
  BackToWork,
  Complete,
  GetToWork,
  PageForClient,
  SendToCLient,
} from '@/features/(application)/action'
import { ProductCard } from '@/entities/products'
import { SimilarProductsForChange } from '@/features/(product)/similar-products-for-change'

export const Application = ({ id }: { id: string }) => {
  const application = useGetApplication(id)

  if (application.isLoading) return <div>Загрузка...</div>
  if (application.isError) return <div>Ошибка</div>
  if (!application.data) return <div>Данные не получены</div>

  return (
    <div className="flex flex-col gap-10">
      <ApplicationInfo
        app={application.data}
        feature={
          <div className="flex gap-2">
            {application.data.info.sub_processing !== 'Ожидание' && (
              <BackToWork id={id} processing={application.data.info.processing} />
            )}
            {application.data.info.sub_processing === 'Ожидание' && (
              <GetToWork id={id} processing={application.data.info.processing} />
            )}
            {!application.data.info.numCheck && (
              <FormCreateCheck id={application.data.info.id} />
            )}
            <SendToCLient id={application.data.info.id} />
            <PageForClient id={application.data.info.id} />
            {application.data.info.numCheck && (
              <InvoicePrintring id={application.data.info.numCheck} />
            )}
            {application.data.info.sub_processing === 'Готово' && (
              <Complete id={id} processing={application.data.info.processing} />
            )}
          </div>
        }
      />

      <div className="space-y-1">
        <UiHeading level={'2'}>Товары</UiHeading>
        <div className="grid grid-cols-8 gap-4">
          {application.data.data.map((item, i) => {
            return (
              <ProductCard
                data={item}
                key={i}
                feature={
                  <>
                    {application.data.info.sub_processing === 'Выполняется' && (
                      <SimilarProductsForChange
                        code={item.code}
                        appId={application.data.info.id}
                        pose={Number(item.position)}
                      />
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
