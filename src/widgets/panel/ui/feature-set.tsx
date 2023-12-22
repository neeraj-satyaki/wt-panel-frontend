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
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'

type Props = {
  item: DataDto
}

export function FeatureSet({ item }: Props) {
  const validProcessings = ['Обращение', 'Заявка', 'Сборка']
  const closeTitles = ['Отправка в тк', 'Отправлено клиенту', 'Заказ получен']

  return (
    <>
      {!closeTitles.includes(item.processing) ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Действие</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="space-y-4 p-2">
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default" disabled={item.sub_processing != 'Готов'}>
                        Отправить на пересборку
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[800px] w-full">
                      <DialogHeader>
                        <DialogTitle>
                          Отправить заявку на пересобрку, указав причины
                        </DialogTitle>
                      </DialogHeader>
                      <RebuidBtn id={item.id} disabled={item.sub_processing != 'Готов'} />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Закрыть
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default" disabled={item.sub_processing != 'Готов'}>
                        Создание продажи
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[800px] w-full">
                      <DialogHeader>
                        <DialogTitle>Заполните данные для создания продажи</DialogTitle>
                      </DialogHeader>
                      <CreateSaleBtn
                        id={item.id}
                        disabled={item.sub_processing != 'Готов'}
                      />
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Закрыть
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
              {validProcessings.includes(item.processing) && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Отказ</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[800px] w-full">
                    <DialogHeader>
                      <DialogTitle>Отказ</DialogTitle>
                    </DialogHeader>
                    <RefuseBtn id={item.id} />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Закрыть
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  )
}
