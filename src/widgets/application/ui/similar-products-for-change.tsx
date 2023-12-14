import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import React, { useState } from 'react'
import LibPagination from '@/shared/lib/lib-pagination'
import { UiCardProduct } from '@/shared/ui/components/ui-card-product'
import { useChangeProduct } from '@/entities/panel/queries'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'
import { IconQrCode } from '@/shared/ui/icons/icon-qr-code'
import { useSearchSimilarProductsScanner } from '../model/use-similar-products'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'
import { Html5QrcodePlugin } from '@/shared/lib/lib-html5-qr-scanner'
type Props = {
  setPage: (page: number) => void
  code: string
  page: number
  count: number
  appId: string
  pose: number
}

export default function SimilarProductsForChange({
  code,
  count,
  page,
  setPage,
  appId,
  pose,
}: Props) {
  const [selectedProduct, setSelectedProduct] = useState('')
  const changeProduct = useChangeProduct()
  const similarProducts = useSearchSimilarProductsScanner(code, page, count)

  return (
    <Dialog onOpenChange={() => [changeProduct.reset()]}>
      <DialogTrigger asChild>
        <Button variant="primary">Похожие</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-full overflow-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Выберите похожий товар</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {changeProduct.isPending && <UiSpinner />}
          {changeProduct.isError && <AnimateError />}
          {changeProduct.isSuccess && <AnimateSuccess />}
          {!changeProduct.isSuccess &&
            !changeProduct.isError &&
            !changeProduct.isPending && (
              <div>
                {similarProducts.isFetching && (
                  <div className="flex justify-center">
                    <UiSpinner />
                  </div>
                )}
                {similarProducts.isError && (
                  <div>Ошибка при загрузке похожих товаров</div>
                )}
                {!similarProducts.data &&
                  !similarProducts.isFetching &&
                  !similarProducts.isError && <div>Ничего не найдено</div>}

                {similarProducts.data &&
                  !similarProducts.isFetching &&
                  !similarProducts.isError && (
                    <div className="flex flex-col gap-6">
                      <div className="space-y-2">
                        <form
                          className="flex gap-2 w-full"
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <Input
                            placeholder="Введите индкод товара"
                            value={similarProducts.addPart}
                            onChange={(e) => similarProducts.setAddPart(e.target.value)}
                            className="w-full"
                          />
                          <Button
                            variant="primary"
                            onClick={() => similarProducts.handleManualSearch()}
                          >
                            Найти
                          </Button>
                        </form>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <IconQrCode />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[800px] w-full">
                            <DialogHeader>
                              <DialogTitle>Отсканируйте паллет</DialogTitle>
                            </DialogHeader>
                            <Html5QrcodePlugin
                              onSuccessScan={(decodeText: string) =>
                                similarProducts.handleSuccessScan(decodeText)
                              }
                            />
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                  Закрыть
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="flex flex-wrap">
                        <div className="grid grid-cols-6 gap-4">
                          {similarProducts.data?.data.map((item, i) => {
                            return (
                              <div className="flex flex-col gap-2 items-center" key={i}>
                                <UiCardProduct
                                  product={item}
                                  q={similarProducts.addPart}
                                />
                                <div>
                                  <Button
                                    variant={
                                      selectedProduct === item.indcode
                                        ? 'secondary'
                                        : 'primary'
                                    }
                                    onClick={() => setSelectedProduct(item.indcode)}
                                  >
                                    {selectedProduct === item.indcode
                                      ? 'Выбран'
                                      : 'Выбрать'}
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      {!similarProducts.data.data.length && (
                        <div className="text-center">Похожие товары отсутсвуют</div>
                      )}
                      {selectedProduct.length > 0 && (
                        <div className="flex justify-center">
                          <Button
                            variant={'secondary'}
                            onClick={() =>
                              changeProduct.mutate({
                                id: appId,
                                indCode: selectedProduct,
                                pose,
                                type: 'Заявка',
                              })
                            }
                          >
                            Заменить
                          </Button>
                        </div>
                      )}
                      {similarProducts.data.info.pages >= 1 && (
                        <LibPagination
                          currentPage={page}
                          totalPages={similarProducts.data.info.pages}
                          nextPage={() => setPage(page + 1)}
                          prevPage={() => setPage(page - 1)}
                        />
                      )}
                    </div>
                  )}
              </div>
            )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="primary">
              Закрыть
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
