import { IconCross } from '@/shared/ui/icons/icon-cross'
import clsx from 'clsx'
import { useSessionQuery } from '@/entities/session'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Nav } from './nav'

export default function MobileMenu({ close }: { close: Function }) {
  const session = useSessionQuery()

  return (
    <div
      className={clsx(
        'absolute overflow-auto w-full h-screen top-0 left-0 bg-primary z-30 flex justify-center pt-16',
      )}
    >
      <button onClick={() => close()} className="fixed top-5 right-5 text-white">
        <IconCross />
      </button>
      {session.isLoading ? <UiSpinner className="text-white" /> : <Nav />}
    </div>
  )
}
