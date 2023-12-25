import clsx from 'clsx'
import { useSessionQuery } from '@/entities/session'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { UiLogo } from './ui-logo'
import { useHeaderStore } from '../model/store'
import { IconArrow } from '@/shared/ui/icons/icon-arrow'
import { Nav } from './nav'

export default function HeaderDekstop() {
  const session = useSessionQuery()
  // const { toggleHeaderVisibility, isHeaderVisible } = useHeaderStore()

  return (
    <header
      className={clsx(
        'h-screen overflow-auto flex flex-col items-start bg-primary relative',
      )}
      style={{
        boxShadow: '4px 0px 10px 0px rgba(0, 35, 109, 0.20)',
      }}
    >
      {/* {isHeaderVisible && ( */}
      <div
        className={clsx('text-white w-full text-center text-2xl py-6', {
          // '1512:py-6': isHeaderVisible,
          // '1512:py-3': !isHeaderVisible,
        })}
      >
        <UiLogo
        // isHeaderVisible={isHeaderVisible}
        />
      </div>
      {/* )} */}
      <div className="w-full">
        {session.isLoading ? (
          <div className="text-white mx-auto">
            <UiSpinner />
          </div>
        ) : (
          <Nav />
        )}
        {/* <button
          onClick={toggleHeaderVisibility}
          className={`absolute text-white/30 bottom-0 left-0 right-0 mx-auto flex justify-center py-4 transition-all hover:text-white`}
        >
          {isHeaderVisible ? (
            <IconArrow direction="left" />
          ) : (
            <IconArrow direction="right" />
          )}
        </button> */}
      </div>
    </header>
  )
}
