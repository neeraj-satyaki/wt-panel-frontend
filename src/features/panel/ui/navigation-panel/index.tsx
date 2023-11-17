import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getIconAndRoute } from '../../model/use-current-link-bad-application'
import { routes } from '@/shared/constants/routing'
import { IconPanel } from '@/shared/ui/icons/icon-panel'
import { useGetBadApplications } from '@/entities/panel'

export const NavigationPanel = () => {
  const { pathname } = useRouter()

  const badApplications = useGetBadApplications()

  if (badApplications.isLoading) {
    return (
      <div className="flex gap-2">
        <div className="w-12 h-6 bg-gray-200 rounded-lg"></div>
        <div className="w-12 h-6 bg-gray-200 rounded-lg"></div>
        <div className="w-12 h-6 bg-gray-200 rounded-lg"></div>
        <div className="w-12 h-6 bg-gray-200 rounded-lg"></div>
      </div>
    )
  }
  if (!badApplications.data) {
    return
  }
  if (badApplications.isError) {
    return <div>Произошла ошибка</div>
  }

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex gap-4 items-center w-full overflow-auto pb-2 430:gap-[18px] 1280:pb-0">
        <Link href={'/panel'}>
          <div
            className={clsx(
              'font-semibold flex items-center gap-2 hover:text-[#454545] transition-all text-sm whitespace-nowrap',
              { 'text-[#454545] font-bold': pathname === routes.PANEL },
              { 'text-[#939393]': pathname != routes.PANEL },
            )}
          >
            <IconPanel />
            Панель
          </div>
        </Link>
        {badApplications.data.map((item, i) => {
          const { icon: Icon, route } = getIconAndRoute(item.state)
          return (
            <Link key={i} href={route}>
              <div
                className={clsx(
                  'font-semibold flex items-center gap-2 hover:text-[#454545] transition-all text-sm whitespace-nowrap',
                  { 'text-[#454545] font-bold': pathname === route },
                  { 'text-[#939393]': pathname != route },
                )}
              >
                <Icon />
                {item.state}
                <span>({item.count})</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
