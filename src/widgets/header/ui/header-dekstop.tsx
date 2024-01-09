import clsx from 'clsx'
import { useSessionQuery } from '@/entities/session'
import { UiLogo } from './ui-logo'
import { Nav } from './nav'

export default function HeaderDekstop() {
  const session = useSessionQuery()

  return (
    <header
      className={clsx(
        'h-screen overflow-auto flex flex-col items-start bg-blue-900 relative',
      )}
      style={{
        boxShadow: '4px 0px 10px 0px rgba(0, 35, 109, 0.20)',
      }}
    >
      <div className={clsx('text-white w-full text-center text-2xl py-6', {})}>
        <UiLogo />
      </div>
      <div className="w-full">
        {session.isLoading ? (
          <div className="text-white mx-auto">Загрузка...</div>
        ) : (
          <Nav />
        )}
      </div>
    </header>
  )
}
