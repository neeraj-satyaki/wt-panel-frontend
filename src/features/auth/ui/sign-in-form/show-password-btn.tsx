import { IconClosedEye } from '@/shared/ui/icons/icon-closed-eye'
import { IconEye } from '@/shared/ui/icons/icon-eye'

export function ShowPasswordBtn({
  isShow,
  close,
  open,
}: {
  isShow: boolean
  close: Function
  open: Function
}) {
  return (
    <div className="flex gap-2 items-center text-gray-400 px-4">
      {isShow ? (
        <div onClick={() => close()} className="flex items-center cursor-pointer">
          <IconClosedEye />
        </div>
      ) : (
        <div onClick={() => open()} className="flex items-center cursor-pointer">
          <IconEye />
        </div>
      )}
    </div>
  )
}
