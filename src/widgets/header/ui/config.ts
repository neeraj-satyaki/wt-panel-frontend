import { routes } from '@/shared/constants/routing'
import {
  Search,
  User,
  LockKeyhole,
  Move,
  Target,
  Camera,
  ShoppingCart,
  ScanSearch,
  Package,
  MonitorDot,
} from 'lucide-react'
interface LinkInterface {
  name: string
  route: string
  icon: any
  isAdmin: boolean // Добавляем поле для отметки ссылки для админа
}

export const linksPanels: LinkInterface[] = [
  {
    name: 'Рабочий стол',
    route: routes.DESKTOP,
    icon: MonitorDot,
    isAdmin: false,
  },
  {
    name: 'Заявки/Продажи',
    route: routes.WORK_PLACE,
    icon: Target,
    isAdmin: false,
  },
  {
    name: 'Фотографии',
    route: routes.PHOTOGRAPHER_PANEL,
    icon: Camera,
    isAdmin: false,
  },
  // {
  //   name: 'Админ панель',
  //   route: routes.ADMIN_PANEL,
  //   icon: LockKeyhole,
  //   isAdmin: true,
  // },
  {
    name: 'Инвентаризация',
    route: routes.INVENTORY,
    icon: Package,
    isAdmin: false,
  },
]

export const linksMyself: LinkInterface[] = [
  {
    name: 'Корзина',
    route: routes.CART,
    icon: ShoppingCart,
    isAdmin: false,
  },
  {
    name: 'Личный кабинет',
    route: routes.PERSONAL_AREA,
    icon: User,
    isAdmin: false,
  },
]
export const linksGeneral: LinkInterface[] = [
  {
    name: 'Каталог',
    route: routes.CATALOG,
    icon: Search,
    isAdmin: false,
  },
  {
    name: 'Перемещение',
    route: routes.MOVING,
    icon: Move,
    isAdmin: false,
  },
  {
    name: 'Поиск',
    route: routes.SEARCH,
    icon: ScanSearch,
    isAdmin: false,
  },
]
