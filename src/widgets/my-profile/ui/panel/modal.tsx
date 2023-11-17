import { UiButton } from '@/shared/ui/components/ui-button'
import { IconGear } from '@/shared/ui/icons/icon-gear'
import { useModalSettings } from '../../model/use-modal-settings'
import { SignOutButton } from '@/features/auth'
import clsx from 'clsx'

export const Modal = () => {
  const { open, close, isShow, modalRef } = useModalSettings()
  return (
    <div className="relative flex justify-end" ref={modalRef}>
      <div className="">
        <UiButton
          variant={'outlined'}
          onClick={isShow ? close : open}
          className={clsx('p-2', {
            'bg-blue-500 text-white': isShow,
            'bg-white ': !isShow,
          })}
        >
          <IconGear />
        </UiButton>
        {isShow && (
          <div className="flex flex-col bg-white absolute rounded-lg right-0 border mt-2 shadow-lg overflow-hidden">
            <SignOutButton />
          </div>
        )}
      </div>
    </div>
  )
}
