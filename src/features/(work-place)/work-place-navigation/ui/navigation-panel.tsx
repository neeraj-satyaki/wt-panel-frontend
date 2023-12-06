import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { routes } from '@/shared/constants/routing'
import { IconPanel } from '@/shared/ui/icons/icon-panel'
import { useGetBadApplications } from '@/entities/panel'
import { SkeletonNavigationPanel } from './skeleton-navigation-panel'
import { getIconAndRoute } from '../model/use-navigation-panel'

export const NavigationPanel = () => {
  const { pathname } = useRouter()

  const badApplications = useGetBadApplications()

  if (badApplications.isLoading) return <SkeletonNavigationPanel />
  if (badApplications.isError) return <div>Ошибка при загрузке</div>
  if (!badApplications.data) return <div>Данные не загружены</div>

  return (
    <div className="flex gap-4 items-center overflow-auto pb-2 430:gap-[18px] 1280:pb-0">
      <Link href={routes.WORK_PLACE}>
        <div
          className={clsx(
            'font-semibold flex items-center gap-2 hover:text-[#454545] transition-all text-lg whitespace-nowrap 1280:text-sm',
            {
              'text-[#454545] font-bold': pathname === routes.WORK_PLACE,
            },
            {
              'text-[#939393]': pathname != routes.WORK_PLACE,
            },
          )}
        >
          <IconPanel className="w-6 h-6 1280:w-5 1280:h-5" />
          Панель
        </div>
      </Link>
      {badApplications.data.map((item, i) => {
        const { icon: Icon, route } = getIconAndRoute(item.state)
        return (
          <Link key={i} href={route}>
            <div
              className={clsx(
                'font-semibold flex items-center gap-2 hover:text-[#454545] transition-all text-lg whitespace-nowrap 1280:text-sm',
                {
                  'text-[#454545] font-bold': pathname === route,
                },
                { 'text-[#939393]': pathname != route },
              )}
            >
              <Icon className="w-6 h-6 1280:w-5 1280:h-5" />
              {item.state}
              <span>({item.count})</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
