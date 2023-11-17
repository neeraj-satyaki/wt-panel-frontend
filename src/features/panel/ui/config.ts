import { routes } from '@/shared/constants/routing'
import { IconPanel } from '@/shared/ui/icons/icon-panel'
import { IconCall } from '@/shared/ui/icons/icon-phone'
import { IconReturn } from '@/shared/ui/icons/icon-return'
import { IconTrash } from '@/shared/ui/icons/icon-trash'

export interface NavigationLinkInterface {
  id: number
  text: string
  route: string
  count?: number
  icon: typeof IconReturn
}
export interface ItemInterface {
  id: number
  text: string
  status: string
}
export interface HeadingInterface {
  title: string
}
export const learningBlocks = [
  { id: 1, text: 'Первый блок' },
  { id: 2, text: 'Второй блок' },
  { id: 3, text: 'Третий блок' },
  { id: 4, text: 'Четвертый блок' },
  { id: 5, text: 'Пятый блок' },
  { id: 6, text: 'Шестой блок' },
]
export const panelNavigationLinks: NavigationLinkInterface[] = [
  { id: 0, text: 'Панель', route: routes.PANEL, icon: IconPanel },
  {
    id: 1,
    text: 'Отказ',
    route: routes.TRASH_BIN,
    icon: IconTrash,
  },
  {
    id: 2,
    text: 'Возврат',
    route: routes.RETURNS,
    icon: IconReturn,
  },
  {
    id: 3,
    text: 'Пропущенные',
    route: routes.MISSED_CALLS,
    icon: IconCall,
  },
]
export const headings: HeadingInterface[] = [
  { title: '№ заявки/продажи' },
  { title: 'Клиент' },
  { title: 'Менеджер' },
  { title: 'Статус' },
  { title: 'Подстатус' },
  { title: 'Исполнитель' },
  { title: 'Действия' },
]
