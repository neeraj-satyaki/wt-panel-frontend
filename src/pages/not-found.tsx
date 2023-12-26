import { Icon404 } from '@/shared/ui/icons/icon-404'
import { HeaderLayoutWidget } from '@/widgets/header'

export function NotFoundPage() {
  return (
    <HeaderLayoutWidget>
      <main className="flex flex-col justify-center items-center h-[90vh]">
        <div className="flex flex-col gap-6 justify-center items-center">
          <Icon404 />
          <div>Страница не найдена</div>
        </div>
      </main>
    </HeaderLayoutWidget>
  )
}
