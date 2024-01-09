import { CatalogWidget } from '@/widgets/catalog'
import { HeaderLayoutWidget } from '@/widgets/header'
import Link from 'next/link'

export function DesktopPage() {
  return (
    <HeaderLayoutWidget>
      <main className="space-y-10">
        <div className="flex flex-col gap-4 1024:flex-row">
          <Link
            className="text-2xl font-semibold 1024:text-sm 1024:h-auto bg-[#003362] flex items-center justify-center text-white rounded-lg px-4 py-4 1024:py-2"
            href="work-place?category=Заявка&type=Заявка"
          >
            Заявки
          </Link>
          <Link
            className="text-2xl font-semibold 1024:text-sm 1024:h-auto bg-[#003362] flex items-center justify-center text-white rounded-lg px-4 py-4 1024:py-2"
            href="work-place?category=Продажа&type=Продажа"
          >
            Продажи
          </Link>
          <Link
            className="text-2xl font-semibold 1024:text-sm 1024:h-auto bg-[#003362] flex items-center justify-center text-white rounded-lg px-4 py-4 1024:py-2"
            href="work-place?category=Отправка+в+тк&type=Продажа"
          >
            Доставка
          </Link>
        </div>
        <CatalogWidget />
      </main>
    </HeaderLayoutWidget>
  )
}
