import { useGetSimilarProducts } from '@/entities/products/queries'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiPageModalLayout } from '@/shared/ui/layouts/ui-page-modal-layout'
import React, { useState } from 'react'
import { LibPagination } from '@/shared/lib/lib-pagination'
import { UiCardProduct } from '@/shared/ui/components/ui-card-product'
import { UiButton } from '@/shared/ui/components/ui-button'
import { useChangeProduct } from '@/entities/panel/queries'
import AnimateError from '@/shared/ui/animations/error'
import AnimateSuccess from '@/shared/ui/animations/success'

type Props = {
  closeModal: (state: boolean) => void
  setPage: (page: number) => void
  code: string
  page: number
  count: number
  appId: string
  pose: string
}

export function SimilarProductsForChange({
  closeModal,
  code,
  count,
  page,
  setPage,
  appId,
  pose,
}: Props) {
  const [selectedProduct, setSelectedProduct] = useState('')
  const similarProducts = useGetSimilarProducts(code, page, count)
  const changeProduct = useChangeProduct()

  return (
    <UiPageModalLayout close={() => closeModal(false)}>
      {changeProduct.isPending && <UiSpinner />}
      {changeProduct.isError && <AnimateError />}
      {changeProduct.isSuccess && <AnimateSuccess />}
      {!changeProduct.isSuccess && !changeProduct.isError && !changeProduct.isPending && (
        <div>
          {similarProducts.isFetching && (
            <div className="flex justify-center">
              <UiSpinner />
            </div>
          )}
          {similarProducts.isError && <div>Something broke</div>}
          {!similarProducts.data &&
            !similarProducts.isFetching &&
            !similarProducts.isError && <div>Ничего не найдено</div>}
          {similarProducts.data && !similarProducts.isFetching && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-8 gap-4">
                {similarProducts.data.data.map((item, i) => {
                  return (
                    <div className="flex flex-col gap-2 items-center" key={i}>
                      <UiCardProduct product={item} />
                      <div>
                        <UiButton
                          variant={
                            selectedProduct === item.indcode ? 'secondary' : 'primary'
                          }
                          className="px-4 py-2 text-sm"
                          onClick={() => setSelectedProduct(item.indcode)}
                        >
                          {selectedProduct === item.indcode ? 'Выбран' : 'Выбрать'}
                        </UiButton>
                      </div>
                    </div>
                  )
                })}
              </div>
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
              <LibPagination
                currentPage={page}
                totalPages={similarProducts.data?.info.pages}
                nextPage={() => setPage(page + 1)}
                prevPage={() => setPage(page - 1)}
              />
            </div>
          )}
        </div>
      )}
    </UiPageModalLayout>
  )
}
