import { UiLink } from '@/shared/ui/components/ui-link'
import { UiLogo } from '@/shared/ui/components/ui-logo'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { links } from './config'
import { useSessionQuery } from '@/entities/session'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'

export function HeaderDekstop() {
  const { pathname } = useRouter()
  const session = useSessionQuery()

  return (
    <header
      className="h-screen overflow-auto flex flex-col items-start bg-[#0847BA] gap-8 1512:gap-6"
      style={{
        boxShadow: '4px 0px 10px 0px rgba(0, 35, 109, 0.20)',
      }}
    >
      <div className="text-white border-b-[1px] border-[#C7D2F7] w-full text-center py-8 text-2xl 1512:py-6">
        <UiLogo />
      </div>
      <div className="mx-5">
        {session.isLoading ? (
          <div className="text-white mx-auto">
            <UiSpinner />
          </div>
        ) : (
          <nav className="flex flex-col gap-7 items-start">
            {links.map((link, i: number) => {
              const isCurrentPage = pathname.includes(link.route)

              const shouldRenderLink =
                (link.isAdmin &&
                  !session.isError &&
                  session.data &&
                  session.data.roles.some((role) => role.title === 'Администратор')) ||
                !link.isAdmin

              return shouldRenderLink ? (
                <UiLink
                  href={link.route}
                  className={clsx('flex gap-3 items-center hover:text-white', {
                    'text-white': isCurrentPage,
                    'text-[#C7D2F7]': !isCurrentPage,
                  })}
                  key={i}
                >
                  <link.icon />
                  <span className={clsx('text-[13px] font-bold 1512:text-sm')}>
                    {link.name}
                  </span>
                </UiLink>
              ) : null
            })}
          </nav>
        )}
      </div>
    </header>
  )
}
