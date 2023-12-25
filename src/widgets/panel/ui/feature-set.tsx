import {
  CreateAppBtn,
  RebuidBtn,
  CreateSaleBtn,
  SendPackage,
  GiveToClient,
  SendToTk,
  RefuseBtn,
} from '@/features/(work-place)/action-v2'
import { AssemblyBtn } from '@/features/(work-place)/action-v2/ui/assembly-btn'
import { AssemblyBtnMyself } from '@/features/(work-place)/action-v2/ui/assembly-btn-myself'
import { DataDto } from '@/shared/api/generated'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/components/ui/sheet'
import { useState } from 'react'

type Props = {
  item: DataDto
}

export function FeatureSet({ item }: Props) {
  const [isShow, setIsShow] = useState(false)
  const validProcessings = ['Обращение', 'Заявка', 'Сборка']
  const closeTitles = ['Отправка в тк', 'Отправлено клиенту', 'Заказ получен']

  if (closeTitles.includes(item.processing)) return

  return (
    <Sheet open={isShow} onOpenChange={setIsShow}>
      <SheetTrigger asChild>
        <Button variant="outline">Действие </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[280px] w-full flex flex-col justify-between">
        <div className="space-y-2">
          <SheetHeader>
            <SheetTitle>Действие {item.id}</SheetTitle>
            <SheetDescription>Выберите что делать с заявкой/продажей </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2">
            {item.processing === 'Обращение' && <CreateAppBtn id={item.id} />}
            {item.processing === 'Заявка' && (
              <>
                <AssemblyBtn id={item.id} />
                <AssemblyBtnMyself id={item.id} />
              </>
            )}
            {item.processing === 'Сборка' && (
              <>
                <RebuidBtn id={item.id} disabled={item.sub_processing != 'Готов'} />
                <CreateSaleBtn id={item.id} disabled={item.sub_processing != 'Готов'} />
              </>
            )}
            {item.processing === 'Продажа' && (
              <>
                <SendPackage id={item.id} disabled={item.sub_processing != 'Готов'} />
                <GiveToClient id={item.id} disabled={item.sub_processing != 'Готов'} />
              </>
            )}
            {item.processing === 'Упаковка' && (
              <>
                <SendToTk id={item.id} disabled={item.sub_processing != 'Готов'} />
                <GiveToClient id={item.id} disabled={item.sub_processing != 'Готов'} />
              </>
            )}
            {validProcessings.includes(item.processing) && <RefuseBtn id={item.id} />}
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button>Закрыть</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
