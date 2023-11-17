import { UiLink } from '@/shared/ui/components/ui-link'
import { IconCross } from '@/shared/ui/icons/icon-cross'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { links } from './config'

export default function MobileMenu({ close }: { close: Function }) {
  const { pathname } = useRouter()
  return (
    <div
      className={clsx(
        'absolute overflow-auto w-full h-screen top-0 left-0 bg-[#0847BA] z-30 flex flex-col items-center justify-center',
      )}
    >
      <button onClick={() => close()} className="absolute top-6 right-6">
        <IconCross />
      </button>

      <nav className="flex flex-col gap-10 items-center">
        {links.map((link, i: number) => {
          const isCurrentPage = pathname === link.route

          return (
            <UiLink
              href={link.route}
              className={clsx('flex gap-3 items-center text-[24px] font-bold', {
                'text-white/60': !isCurrentPage,
                'text-white': isCurrentPage,
              })}
              key={i}
            >
              <link.icon className="w-6 h-6" />
              <span>{link.name}</span>
            </UiLink>
          )
        })}
      </nav>
    </div>
  )
}
