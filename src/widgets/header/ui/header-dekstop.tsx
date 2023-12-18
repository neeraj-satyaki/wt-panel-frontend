import { UiLink } from '@/shared/ui/components/ui-link'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { links } from './config'
import { useSessionQuery } from '@/entities/session'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiLogo } from './ui-logo'
import { useHeaderStore } from '../model/store'
import { IconArrow } from '@/shared/ui/icons/icon-arrow'

export default function HeaderDekstop() {
  const { pathname } = useRouter()
  const session = useSessionQuery()
  const { toggleHeaderVisibility, isHeaderVisible } = useHeaderStore()

  return (
    <header
      className={clsx(
        'h-screen overflow-auto flex flex-col items-start bg-primary gap-8 relative',
        {
          '1512:gap-6': isHeaderVisible,
          '1512:gap-0': !isHeaderVisible,
        },
      )}
      style={{
        boxShadow: '4px 0px 10px 0px rgba(0, 35, 109, 0.20)',
      }}
    >
      {isHeaderVisible && (
        <div
          className={clsx(
            'text-white border-b-[1px] border-[#C7D2F7] w-full text-center py-8 text-2xl',
            {
              '1512:py-6': isHeaderVisible,
              '1512:py-3': !isHeaderVisible,
            },
          )}
        >
          <UiLogo isHeaderVisible={isHeaderVisible} />
        </div>
      )}
      <div
        className={`w-full  ${
          !isHeaderVisible ? 'flex flex-col justify-center h-full' : ''
        }`}
      >
        {session.isLoading ? (
          <div className="text-white mx-auto">
            <UiSpinner />
          </div>
        ) : (
          <nav className={`flex flex-col w-full`}>
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
                  className={clsx('flex gap-3 items-center hover:text-white  py-4', {
                    'text-white': isCurrentPage,
                    'text-white/50': !isCurrentPage,
                    'justify-center': !isHeaderVisible,
                    'pl-5 ': isHeaderVisible,
                  })}
                  key={i}
                >
                  <link.icon />
                  {isHeaderVisible && (
                    <span className={clsx('text-[13px] font-bold 1512:text-sm')}>
                      {link.name}
                    </span>
                  )}
                </UiLink>
              ) : null
            })}
          </nav>
        )}
        <button
          onClick={toggleHeaderVisibility}
          className={`absolute text-white/30 bottom-0 left-0 right-0 mx-auto flex justify-center py-4 transition-all hover:text-white`}
        >
          {isHeaderVisible ? (
            <IconArrow direction="left" />
          ) : (
            <IconArrow direction="right" />
          )}
        </button>
      </div>
    </header>
  )
}
