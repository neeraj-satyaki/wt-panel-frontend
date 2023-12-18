import { UiLink } from '@/shared/ui/components/ui-link'
import { IconCross } from '@/shared/ui/icons/icon-cross'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { links } from './config'
import { useSessionQuery } from '@/entities/session'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

export default function MobileMenu({ close }: { close: Function }) {
  const { pathname } = useRouter()
  const session = useSessionQuery()

  return (
    <div
      className={clsx(
        'absolute overflow-auto w-full h-screen top-0 left-0 bg-primary z-30 flex flex-col items-center justify-center',
      )}
    >
      <button onClick={() => close()} className="absolute top-5 right-5 text-white">
        <IconCross />
      </button>
      {session.isLoading ? (
        <UiSpinner className="text-white" />
      ) : (
        <nav className="flex flex-col gap-10 items-center">
          {links.map((link, i: number) => {
            const isCurrentPage = pathname.includes(link.route)

            const shouldRenderLink =
              (link.isAdmin &&
                session.data &&
                !session.isError &&
                session.data.roles.some((role) => role.title === 'Администратор')) ||
              !link.isAdmin

            return shouldRenderLink ? (
              <UiLink
                href={link.route}
                className={clsx('flex gap-3 items-center font-bold text-3xl', {
                  'text-white/50': !isCurrentPage,
                  'text-white': isCurrentPage,
                })}
                key={i}
              >
                <link.icon className="w-8 h-8" />
                <span className={clsx('font-bold')}>{link.name}</span>
              </UiLink>
            ) : null
          })}
        </nav>
      )}
    </div>
  )
}
