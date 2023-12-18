import { routes } from '@/shared/constants/routing'
import { Trash2, Undo2, PhoneIncoming, PanelTop } from 'lucide-react'

export interface NavigationLinkInterface {
  id: number
  text: string
  route: string
  count?: number
  icon: any
}

export const panelNavigationLinks: NavigationLinkInterface[] = [
  {
    id: 0,
    text: 'Панель',
    route: routes.WORK_PLACE,
    icon: PanelTop,
  },
  {
    id: 1,
    text: 'Отказ',
    route: routes.REFUSES,
    icon: Trash2,
  },
  {
    id: 2,
    text: 'Возврат',
    route: routes.RETURNS,
    icon: Undo2,
  },
  {
    id: 3,
    text: 'Пропущенные',
    route: routes.MISSED_CALLS,
    icon: PhoneIncoming,
  },
]
