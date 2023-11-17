import { Icon404 } from '@/shared/ui/icons/icon-404'
import { UiHeaderLayout } from '@/shared/ui/layouts/ui-header-layout'

export function NotFoundPage() {
  return (
    <>
      <UiHeaderLayout>
        <main className="flex flex-col justify-center items-center h-[90vh]">
          <div className="flex flex-col gap-6 justify-center items-center">
            <Icon404 />
            <div>Страница не найдена</div>
          </div>
        </main>
      </UiHeaderLayout>
    </>
  )
}
