import { HeaderLayoutWidget } from '@/widgets/header'
import { PersonalAreaWidget } from '@/widgets/personal-area'
import { CalendarOfDatePhotosStatisticsWidget } from '@/widgets/photos-statistics'
import { InventoryProcessWidget } from '@/widgets/process-inventory'
import { useState } from 'react'
import GridLayout from 'react-grid-layout'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export function DesktopPage() {
  const [change, setChange] = useState(true)
  const [layout, setLayout] = useState([
    { i: 'one', x: 0, y: 0, w: 1, h: 2, static: change },
    { i: 'two', x: 1, y: 0, w: 3, h: 2, static: change },
    { i: 'three', x: 2, y: 0, w: 3, h: 2, static: change },
  ])

  const handleLayoutChange = (newLayout: any) => {
    setLayout(newLayout)
  }
  const handleButtonClick = () => {
    const newChange = !change
    const newLayout = layout.map((item) => ({ ...item, static: newChange }))
    setChange(newChange)
    setLayout(newLayout)
  }

  const getComponent = (key: any) => {
    switch (key) {
      case 'one':
        return <InventoryProcessWidget />
      case 'two':
        return <CalendarOfDatePhotosStatisticsWidget />
      case 'three':
        return <PersonalAreaWidget />
      default:
        return null
    }
  }
  return (
    <HeaderLayoutWidget>
      <main className="space-y-10">
        <div>
          <button onClick={handleButtonClick}>
            {change ? 'Редактировать' : 'Сохранить'}
          </button>
          <GridLayout
            className="layout"
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1640}
            onLayoutChange={handleLayoutChange}
          >
            {layout.map((item) => (
              <div key={item.i} className="overflow-auto">
                {getComponent(item.i)}
              </div>
            ))}
          </GridLayout>
        </div>
      </main>
    </HeaderLayoutWidget>
  )
}

{
  /* <div className="flex flex-col gap-4 1024:flex-row">
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
<CatalogWidget /> */
}
