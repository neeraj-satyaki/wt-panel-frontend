import { routes } from '@/shared/constants/routing'
import { Search, User, LockKeyhole, Move, Target } from 'lucide-react'
interface LinkInterface {
  name: string
  route: string
  icon: any // используем typeof для получения типа компонента
  isAdmin: boolean // Добавляем поле для отметки ссылки для админа
}

export const links: LinkInterface[] = [
  {
    name: 'Рабочее место',
    route: routes.WORK_PLACE,
    icon: Target,
    isAdmin: false,
  },
  {
    name: 'Каталог',
    route: routes.CATALOG,
    icon: Search,
    isAdmin: false,
  },
  {
    name: 'Личный кабинет',
    route: routes.PERSONAL_AREA,
    icon: User,
    isAdmin: false,
  },
  {
    name: 'Админ панель',
    route: routes.ADMIN_PANEL,
    icon: LockKeyhole,
    isAdmin: true,
  },
  {
    name: 'Перемещение',
    route: routes.MOVING,
    icon: Move,
    isAdmin: false,
  },
]
