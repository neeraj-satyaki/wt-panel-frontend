import clsx from 'clsx'
import { useSessionQuery } from '@/entities/session'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiLogo } from './ui-logo'
import { Nav } from './nav'

export default function HeaderDekstopV2() {
  const session = useSessionQuery()

  return (
    <header
      className={clsx(
        'overflow-auto flex bg-[#3352b9] relative items-center justify-between px-4',
      )}
    >
      <div className={clsx('text-white text-2xl', {})}>
        <UiLogo />
      </div>
      <div>
        {session.isLoading ? (
          <div className="text-white mx-auto">
            <UiSpinner />
          </div>
        ) : (
          <Nav />
        )}
      </div>
    </header>
  )
}
