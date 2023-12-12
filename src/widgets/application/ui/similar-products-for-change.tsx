import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import React, { useState } from 'react'
import LibPagination from '@/shared/lib/lib-pagination'
import { UiCardProduct } from '@/shared/ui/components/ui-card-product'
import { useChangeProduct } from '@/entities/panel/queries'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { IconQrCode } from '@/shared/ui/icons/icon-qr-code'
import { useSearchSimilarProductsScanner } from '../model/use-similar-products'
import ScannerFindProductOfSimilar from './scanner-find-products-of-similar'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'

type Props = {
  closeModal: (state: boolean) => void
  setPage: (page: number) => void
  code: string
  page: number
  count: number
  appId: string
  pose: string
}

export default function SimilarProductsForChange({
  closeModal,
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
    <UiPageModalLayout close={() => closeModal(false)}>
      {similarProducts.showScanner && (
        <ScannerFindProductOfSimilar
          close={similarProducts.closeScanner}
          successScan={similarProducts.handleSuccessScan}
        />
      )}
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
              {similarProducts.isError && <div>Ошибка при загрузке похожих товаров</div>}
              {!similarProducts.data &&
                !similarProducts.isFetching &&
                !similarProducts.isError && <div>Ничего не найдено</div>}

              {similarProducts.data &&
                !similarProducts.isFetching &&
                !similarProducts.isError && (
                  <div className="flex flex-col gap-6">
                    <UiHeading level={'3'}>Похожие товары</UiHeading>
                    <div className="flex flex-col gap-2 items-start">
                      <div className="flex gap-2 w-full">
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
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => similarProducts.openScanner()}
                      >
                        <IconQrCode />
                      </Button>
                    </div>
                    <UiListProductsLayout>
                      {similarProducts.data.data.map((item, i) => {
                        return (
                          <div className="flex flex-col gap-2 items-center" key={i}>
                            <UiCardProduct product={item} q={similarProducts.addPart} />
                            <div>
                              <Button
                                variant={
                                  selectedProduct === item.indcode
                                    ? 'secondary'
                                    : 'primary'
                                }
                                onClick={() => setSelectedProduct(item.indcode)}
                              >
                                {selectedProduct === item.indcode ? 'Выбран' : 'Выбрать'}
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </UiListProductsLayout>
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
    </UiPageModalLayout>
  )
}
