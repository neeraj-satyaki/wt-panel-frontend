import { SignOutButton } from '@/features/auth'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/components/ui/sheet'
import { IconGear } from '@/shared/ui/icons/icon-gear'

export function ModalSettings() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={'icon'}>
          <IconGear />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[280px] w-full flex flex-col justify-between">
        <div className="space-y-4">
          <SheetHeader>
            <SheetTitle>Настройки</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col">
            <SignOutButton />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="text-lg py-6 font-semibold 1024:text-sm 1024:py-4">
              Закрыть
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
