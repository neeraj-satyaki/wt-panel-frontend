import { SaleDto } from '@/shared/api/generated'
import { routes } from '@/shared/constants/routing'
import Link from 'next/link'
import Image from 'next/image'
import ImageNotFound from '@/public/image-not-found.png'
import { UiButton } from '@/shared/ui/components/ui-button'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { useIssueProduct } from '../model/use-issue-product'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'

export const Item = ({
  saleId,
  data,
  subProcessing,
  processing,
}: {
  saleId: string
  data: SaleDto
  subProcessing: string
  processing: string
}) => {
  const { issueModal, close, open, successScan, issueProduct, isNotThatProduct } =
    useIssueProduct(saleId, data.id)
  return (
    <div className="flex flex-col gap-2">
      {processing === 'Продажа' && (
        <div className="flex">
          {data.state === 'Да' && (
            <div className="bg-green-500 py-2 px-4 rounded-lg font-semibold text-white">
              Выдан
            </div>
          )}
          {data.state === 'Нет' && 'Не выдан'}
        </div>
      )}
      {issueModal && (
        <UiPageModalLayout close={() => close()}>
          <div className="flex flex-col gap-4 items-center">
            <UiHeading level={'4'}>Проверка товара</UiHeading>
            {issueProduct.isPending && (
              <div className="self-center py-16">
                <UiSpinner />
              </div>
            )}
            {issueProduct.isError && (
              <div className="flex gap-4 flex-col">
                <AnimateError />
                <UiHeading level={'5'}>Произошла ошибка</UiHeading>
              </div>
            )}
            {issueProduct.isSuccess && (
              <div className="flex gap-4 flex-col">
                <AnimateSuccess />
                <UiHeading level={'5'}>Успешно</UiHeading>
              </div>
            )}
            {isNotThatProduct && (
              <div className="flex gap-4 flex-col">
                <AnimateError />
                <UiHeading level={'5'}>Это не тот товар</UiHeading>
              </div>
            )}
            {!issueProduct.isPending &&
              !issueProduct.isError &&
              !issueProduct.isSuccess &&
              !isNotThatProduct && (
                <div className="min-w-[800px] w-full">
                  <Html5QrcodePlugin
                    fps={10}
                    qrbox={500}
                    disableFlip={false}
                    qrCodeSuccessCallback={(decodedText: any, decodedResult: any) =>
                      successScan(decodedText, decodedResult, [data.position])
                    }
                  />
                </div>
              )}
          </div>
        </UiPageModalLayout>
      )}
      {data.id ? (
        <Link href={routes.PRODUCT + '/' + data.id} className="flex flex-col gap-2">
          <Image
            src={data.photos?.length ? data.photos[0] : ImageNotFound}
            alt={data.name || ''}
            width={600}
            height={400}
            className="object-cover w-full h-52 rounded-lg"
          />
          <div>
            <div className="font-semibold">{data.name || 'Не указано'}</div>
            <div>Артикль: {data.article || 'Не указано'}</div>
            <div>Кол-во: {data.count || 'Не указано'}</div>
            <div>Место: {data.place || 'Не указано'}</div>
            <div>
              Наличие на К складе:{' '}
              {data.availability_in_k_warehouse === 1 ? 'Есть' : 'Нет'}
            </div>
            <div>Цена: {data.cost || 'Не указано'} Р</div>
          </div>
        </Link>
      ) : (
        <div className="flex flex-col gap-2">
          <Image
            src={data.photos?.length ? data.photos[0] : ImageNotFound}
            alt={data.name || ''}
            width={600}
            height={400}
            className="object-cover w-full h-52 rounded-lg"
          />
          <div>
            <div className="font-semibold">{data.name || 'Не указано'}</div>
            <div>Артикль: {data.article || 'Не указано'}</div>
            <div>Кол-во: {data.count || 'Не указано'}</div>
            <div>Место: {data.place || 'Не указано'}</div>
            <div>
              Наличие на К складе:{' '}
              {data.availability_in_k_warehouse === 1 ? 'Есть' : 'Нет'}
            </div>
            <div>Цена: {data.cost || 'Не указано'} Р</div>
          </div>
        </div>
      )}
      {subProcessing === 'Выполняется' &&
        data.state === 'Нет' &&
        processing === 'Продажа' && (
          <div>
            <UiButton variant={'primary'} className="px-4 py-2" onClick={() => open()}>
              Проверить
            </UiButton>
          </div>
        )}
    </div>
  )
}
