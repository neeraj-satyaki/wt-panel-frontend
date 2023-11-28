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

export const panelNavigationLinks: NavigationLinkInterface[] = [
  {
    id: 0,
    text: 'Панель',
    route: routes.WORK_PLACE,
    icon: IconPanel,
  },
  {
    id: 1,
    text: 'Отказ',
    route: routes.REFUSES,
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
