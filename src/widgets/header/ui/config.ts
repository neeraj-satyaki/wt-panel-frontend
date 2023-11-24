import { routes } from '@/shared/constants/routing'
import { IconLock } from '@/shared/ui/icons/icon-lock'
import { IconMagnifier } from '@/shared/ui/icons/icon-magnifier'
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
    name: 'Мой профиль',
    route: routes.MY_PROFILE,
    icon: IconUser,
    isAdmin: false,
  },
  {
    name: 'Админ панель',
    route: routes.ADMIN_PANEL,
    icon: IconLock,
    isAdmin: true,
  },
]
