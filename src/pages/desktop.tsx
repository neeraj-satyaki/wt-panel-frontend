// import { CatalogWidget } from '@/widgets/catalog'
// import { HeaderLayoutWidget } from '@/widgets/header'
// import { MovingWidget } from '@/widgets/moving-product'
// import { PanelWidget } from '@/widgets/panel'
// import { SearchWidget } from '@/widgets/search'
// import { Move } from 'lucide-react'
// import { useState } from 'react'
// import { Responsive, WidthProvider } from 'react-grid-layout'
// const ResponsiveGridLayout = WidthProvider(Responsive)

// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'

// export function DesktopPage() {
//   const [mockWidgets, setMockWidgets] = useState([
//     { name: 'search', x: 3, y: 0, h: 1, w: 3 },
//     { name: 'moving', x: 0, y: 0, h: 1, w: 3 },
//     { name: 'catalog', x: 0, y: 1, h: 4, w: 6 },
//     { name: 'panel', x: 0, y: 1, h: 4, w: 6 },
//   ])
//   const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 320 }
//   const cols = { lg: 6, md: 4, sm: 1, xs: 1, xxs: 1 }

//   const getComponent = (key: any) => {
//     switch (key) {
//       case 'panel':
//         return <PanelWidget />
//       case 'moving':
//         return <MovingWidget />
//       case 'catalog':
//         return <CatalogWidget />
//       case 'search':
//         return <SearchWidget />
//       default:
//         return null
//     }
//   }

//   const handleDragStop = (
//     layout: any,
//     oldItem: any,
//     newItem: any,
//     placeholder: any,
//     e: any,
//     element: any,
//   ) => {
//     const updatedMockWidgets = mockWidgets.map((item) => {
//       if (item.name === newItem.i) {
//         return { ...item, w: newItem.w, h: newItem.h, x: newItem.x, y: newItem.y }
//       }
//       return item
//     })
//     setMockWidgets(updatedMockWidgets)
//   }

//   const handleResizeStop = (
//     layout: any,
//     oldItem: any,
//     newItem: any,
//     placeholder: any,
//     e: any,
//     element: any,
//   ) => {
//     const updatedMockWidgets = mockWidgets.map((item) => {
//       if (item.name === newItem.i) {
//         return { ...item, w: newItem.w, h: newItem.h, x: newItem.x, y: newItem.y }
//       }
//       return item
//     })
//     setMockWidgets(updatedMockWidgets)
//   }

//   return (
//     <HeaderLayoutWidget>
//       <main className="space-y-10">
//         <div>
//           <ResponsiveGridLayout
//             onDragStop={handleDragStop}
//             onResizeStop={handleResizeStop}
//             className="layout"
//             breakpoints={breakpoints}
//             cols={cols}
//             draggableHandle=".react-grid-dragHandleExample"
//           >
//             {mockWidgets.map((item) => (
//               <div
//                 key={item.name}
//                 className="overflow-auto border p-2 rounded-lg shadow-md bg-white"
//                 data-grid={{ x: item.x, y: item.y, w: item.w, h: item.h }}
//               >
//                 {getComponent(item.name)}
//                 <span className="react-grid-dragHandleExample cursor-pointer absolute top-2 right-2">
//                   <Move />
//                 </span>
//               </div>
//             ))}
//           </ResponsiveGridLayout>
//         </div>
//       </main>
//     </HeaderLayoutWidget>
//   )
// }

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
