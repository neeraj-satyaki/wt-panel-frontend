import ImageNotFound from '@/public/image-not-found.png'
import { SaleDto } from '@/shared/api/generated'
import { routes } from '@/shared/constants/routing'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'
import Image from 'next/image'
import Link from 'next/link'
import { useIssueProduct } from '../model/use-issue-product'

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
  const { successScan, issueProduct } = useIssueProduct(saleId, data.id)
  return (
    <div className="flex flex-col gap-2">
      {processing === 'Продажа' && (
        <div className="flex">
          {data.state === 'Да' && (
            <div className="bg-green-500 py-2 px-4 rounded-lg font-semibold text-white">
              Выдан
            </div>
          )}
          {data.state === 'Нет' && (
            <div className="bg-red-500 py-2 px-4 rounded-lg font-semibold text-white">
              Не выдан
            </div>
          )}
        </div>
      )}
      {data.id ? (
        <Link href={routes.PRODUCT + '/' + data.id} className="flex flex-col gap-2">
          <Image
            src={data.photos?.length ? data.photos[0] : ImageNotFound}
            alt={data.name || ''}
            width={600}
            height={400}
            className="object-cover w-full h-40 rounded-lg"
          />
          <div>
            <div className="font-semibold">{data.name || 'Не указано'}</div>
            <div>Артикул: {data.article || 'Не указано'}</div>
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
            className="object-cover w-full h-40 rounded-lg"
          />
          <div>
            <div className="font-semibold">{data.name || 'Не указано'}</div>
            <div>Артикул: {data.article || 'Не указано'}</div>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">Выдать</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[800px] w-full">
              <DialogHeader>
                <DialogTitle>Проверка товара</DialogTitle>
              </DialogHeader>
              {issueProduct.isPending ? (
                <div>Загрузка...</div>
              ) : (
                <div className="w-full">
                  <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={(decodedText: string) =>
                      successScan(decodedText, data.position, data.position)
                    }
                  />
                </div>
              )}
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Закрыть
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
    </div>
  )
}
