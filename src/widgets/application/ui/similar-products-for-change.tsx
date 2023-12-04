import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import React, { useState } from 'react'
import LibPagination from '@/shared/lib/lib-pagination'
import { UiCardProduct } from '@/shared/ui/components/ui-card-product'
import { UiButton } from '@/shared/ui/components/ui-button'
import { useChangeProduct } from '@/entities/panel/queries'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { IconQrCode } from '@/shared/ui/icons/icon-qr-code'
import { useSearchSimilarProductsScanner } from '../model/use-similar-products'
import ScannerFindProductOfSimilar from './scanner-find-products-of-similar'
import { UiListProductsLayout } from '@/shared/ui/layouts/ui-list-products-layout'

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
              {similarProducts.data && !similarProducts.isFetching && (
                <div className="flex flex-col gap-6">
                  <UiHeading level={'3'}>Похожие товары для {code}</UiHeading>
                  <div className="flex flex-col gap-2 items-start">
                    <UiTextField
                      inputProps={{
                        placeholder: 'Введите добавочный номер',
                        value: similarProducts.addPart,
                        onChange: (e) => [
                          similarProducts.setAddPart(e.target.value),
                          similarProducts.setIsManualInput(true),
                        ],
                      }}
                      className="w-full"
                    />
                    <UiButton
                      variant="outlined"
                      className="p-2"
                      onClick={() => similarProducts.openScanner()}
                    >
                      <IconQrCode />
                    </UiButton>
                  </div>
                  <UiListProductsLayout>
                    {similarProducts.data.data.map((item, i) => {
                      return (
                        <div className="flex flex-col gap-2 items-center" key={i}>
                          <UiCardProduct product={item} q={similarProducts.addPart} />
                          <div>
                            <UiButton
                              variant={
                                selectedProduct === item.indcode ? 'secondary' : 'primary'
                              }
                              className="px-4 py-2 text-lg"
                              onClick={() => setSelectedProduct(item.indcode)}
                            >
                              {selectedProduct === item.indcode ? 'Выбран' : 'Выбрать'}
                            </UiButton>
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
                      <UiButton
                        variant={'secondary'}
                        className="px-4 py-2"
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
                      </UiButton>
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
