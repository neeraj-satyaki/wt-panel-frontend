import { PanelTop } from 'lucide-react'
import { panelNavigationLinks } from '../ui/config'
import { routes } from '@/shared/constants/routing'

export const getIconAndRoute = (state: any) => {
  const link = panelNavigationLinks.find((link) => link.text === state)

  if (link) {
    return {
      icon: link.icon,
      route: link.route,
    }
  }

  return {
    icon: PanelTop, // Ваша иконка по умолчанию
    route: routes.WORK_PLACE, // Ваш путь по умолчанию
  }
}
