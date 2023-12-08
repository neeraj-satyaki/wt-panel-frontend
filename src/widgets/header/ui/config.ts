import { routes } from '@/shared/constants/routing'
import { IconLock } from '@/shared/ui/icons/icon-lock'
import { IconMagnifier } from '@/shared/ui/icons/icon-magnifier'
import { IconMove } from '@/shared/ui/icons/icon-move'
import { IconUser } from '@/shared/ui/icons/icon-user'
import { IconWorkPlace } from '@/shared/ui/icons/icon-work-place'

interface LinkInterface {
  name: string
  route: string
  icon: typeof IconWorkPlace // используем typeof для получения типа компонента
  isAdmin: boolean // Добавляем поле для отметки ссылки для админа
}

export const links: LinkInterface[] = [
  {
    name: 'Рабочее место',
    route: routes.WORK_PLACE,
    icon: IconWorkPlace,
    isAdmin: false,
  },
  {
    name: 'Каталог',
    route: routes.CATALOG,
    icon: IconMagnifier,
    isAdmin: false,
  },
  {
    name: 'Личный кабинет',
    route: routes.PERSONAL_AREA,
    icon: IconUser,
    isAdmin: false,
  },
  {
    name: 'Админ панель',
    route: routes.ADMIN_PANEL,
    icon: IconLock,
    isAdmin: true,
  },
  {
    name: 'Перемещение',
    route: routes.MOVING,
    icon: IconMove,
    isAdmin: false,
  },
]
