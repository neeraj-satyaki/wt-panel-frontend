import { useAppOrSaleStore, useGetAppOrSales } from '@/entities/panel-v2'
import { ItemRow } from '@/entities/panel-v2/ui/table-row'
import {
  CreateAppBtn,
  CreateSaleBtn,
  GiveToClient,
  RebuidBtn,
  RefuseBtn,
  SendPackage,
  SendToTk,
} from '@/features/(work-place)/action-v2'
import { AssemblyBtn } from '@/features/(work-place)/action-v2/ui/assembly-btn'
import { AssemblyBtnMyself } from '@/features/(work-place)/action-v2/ui/assembly-btn-myself'
import LibPagination from '@/shared/lib/lib-pagination'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/components/ui/table'

export function PanelTable() {
  const { currentCategory, type, page, q, setPage, count } = useAppOrSaleStore()

  const appOrSale = useGetAppOrSales(
    currentCategory,
    type,
    page.toString(),
    count.toString(),
    q,
  )
  const validProcessings = ['Обращение', 'Заявка', 'Сборка']
  const closeTitles = ['Отправка в тк', 'Отправлено клиенту', 'Заказ получен']

  if (appOrSale.isLoading) return <div>Loading...</div>
  if (appOrSale.isError) return <div>Ошибка при загрузке данных</div>
  if (!appOrSale.data) return <div>Нет данных</div>

  return (
    <div className="space-y-2">
      {appOrSale.isFetching && <div>Readlod</div>}
      <Table className="border">
        <TableCaption>Список всех заявок и продаж</TableCaption>
        <TableHeader className="bg-gray-200">
          <TableRow>
            <TableHead className="border-r border-gray-300 w-[180px] text-center">
              № заявки/продажи
            </TableHead>
            <TableHead className="border-r border-gray-300 text-center">Клиент</TableHead>
            <TableHead className="border-r border-gray-300 text-center">
              Менеджер
            </TableHead>
            <TableHead className="border-r border-gray-300 text-center">Статус</TableHead>
            <TableHead className="border-r border-gray-300 text-center">
              Подстатус
            </TableHead>
            <TableHead className="border-r border-gray-300 text-center">
              Исполнитель
            </TableHead>
            <TableHead className="w-[120px] text-center">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appOrSale.data.data.map((item) => (
            <ItemRow
              item={item}
              key={item.id}
              feauture={
                <>
                  {!closeTitles.includes(item.processing) ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">Действие</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="space-y-4 p-2">
                        <div className="flex flex-col gap-2">
                          {item.processing === 'Обращение' && (
                            <CreateAppBtn id={item.id} />
                          )}
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
                                  <Button
                                    variant="default"
                                    disabled={item.sub_processing != 'Готов'}
                                  >
                                    Отправить на пересборку
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[800px] w-full">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Отправить заявку на пересобрку, указав причины
                                    </DialogTitle>
                                  </DialogHeader>
                                  <RebuidBtn
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

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="default"
                                    disabled={item.sub_processing != 'Готов'}
                                  >
                                    Создание продажи
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[800px] w-full">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Заполните данные для создания продажи
                                    </DialogTitle>
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
                              <SendPackage
                                id={item.id}
                                disabled={item.sub_processing != 'Готов'}
                              />
                              <GiveToClient
                                id={item.id}
                                disabled={item.sub_processing != 'Готов'}
                              />
                            </>
                          )}
                          {item.processing === 'Упаковка' && (
                            <>
                              <SendToTk
                                id={item.id}
                                disabled={item.sub_processing != 'Готов'}
                              />
                              <GiveToClient
                                id={item.id}
                                disabled={item.sub_processing != 'Готов'}
                              />
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
              }
            />
          ))}
        </TableBody>
      </Table>
      <LibPagination
        currentPage={page}
        totalPages={appOrSale.data.info.pages}
        nextPage={() => setPage(page + 1)}
        prevPage={() => setPage(page - 1)}
      />
    </div>
  )
}
