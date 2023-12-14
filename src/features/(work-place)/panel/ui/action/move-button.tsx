import { DataDto } from '@/shared/api/generated'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
import FormCreateSale from '../form-create-sale'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/ui/form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/components/ui/dialog'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { useRefusalApplication } from '@/entities/panel/queries'
import { useMoveAppSaleA } from '../../model/use-app-sales'
import { useState } from 'react'

type Props = {
  item: DataDto
}
const FormSchemaRefuse = z.object({
  refuse: z.string().refine((data) => data.trim() !== '', {
    message: 'Укажите причину отказа.',
  }),
})
const FormSchemaRebuild = z.object({
  reason: z.string().refine((data) => data.trim() !== '', {
    message: 'Укажите причину отказа.',
  }),
})
export function MoveButton({ item }: Props) {
  const formRefuse = useForm<z.infer<typeof FormSchemaRefuse>>({
    resolver: zodResolver(FormSchemaRefuse),
    defaultValues: {
      refuse: '',
    },
  })
  const formRebuild = useForm<z.infer<typeof FormSchemaRebuild>>({
    resolver: zodResolver(FormSchemaRebuild),
    defaultValues: {
      reason: '',
    },
  })
  const [showModal, setShowModal] = useState(false)
  const refuse = useRefusalApplication()
  const {
    actionId,
    moveAppSale,
    actionProcessing,
    actionSubProcessng,
    openActionModal,
    openAddTkModal,
  } = useMoveAppSaleA()

  function onSubmitRefuse(data: z.infer<typeof FormSchemaRefuse>) {
    refuse.mutate({ id: actionId, reason: data.refuse })
    setShowModal(false)
  }
  function onSubmitRebuild(data: z.infer<typeof FormSchemaRebuild>) {
    moveAppSale.mutate({
      id: actionId,
      processing: 'Сборка',
      sub_processing: '1',
      type: 'Заявка',
      move_myself: false,
      comment_for_collector: data.reason,
    })
    setShowModal(false)
  }
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => openActionModal(item.id, item.processing, item.sub_processing)}
        >
          Действие
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Действие</DialogTitle>
        </DialogHeader>
        {moveAppSale.isPending || refuse.isPending ? (
          <UiSpinner className="w-full my-20" />
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {actionProcessing === 'Обращение' && (
                <div className="flex flex-col gap-2 1024:items-start">
                  <Button
                    variant="primary"
                    onClick={() =>
                      moveAppSale.mutate({
                        id: actionId,
                        processing: 'Заявка',
                        sub_processing: '0',
                        type: 'Заявка',
                        move_myself: true,
                        comment_for_collector: '',
                      })
                    }
                  >
                    В работу
                  </Button>
                  <Form {...formRefuse}>
                    <form
                      onSubmit={formRefuse.handleSubmit(onSubmitRefuse)}
                      className="space-y-2"
                    >
                      <FormField
                        control={formRefuse.control}
                        name="refuse"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Причина отказа</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Укажите причину отказа"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button variant="destructive">Отказ</Button>
                    </form>
                  </Form>
                </div>
              )}
              {actionProcessing === 'Заявка' && (
                <div className="flex flex-col gap-2 1024:items-start">
                  <Button
                    variant="primary"
                    onClick={() =>
                      moveAppSale.mutate({
                        id: actionId,
                        processing: 'Сборка',
                        sub_processing: '1',
                        type: 'Заявка',
                        move_myself: false,
                        comment_for_collector: '',
                      })
                    }
                  >
                    Отправить на сборку
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() =>
                      moveAppSale.mutate({
                        id: actionId,
                        processing: 'Сборка',
                        sub_processing: '2',
                        type: 'Заявка',
                        move_myself: true,
                        comment_for_collector: '',
                      })
                    }
                  >
                    Собрать самому
                  </Button>
                  <Form {...formRefuse}>
                    <form
                      onSubmit={formRefuse.handleSubmit(onSubmitRefuse)}
                      className="space-y-2"
                    >
                      <FormField
                        control={formRefuse.control}
                        name="refuse"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Причина отказа</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Укажите причину отказа"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button variant="destructive">Отказ</Button>
                    </form>
                  </Form>
                </div>
              )}

              {actionProcessing === 'Сборка' && (
                <div className="flex flex-col gap-2 1024:items-start">
                  {actionSubProcessng != 'Готов' ? (
                    <Button variant="primary" disabled={true}>
                      Создать продажу
                    </Button>
                  ) : (
                    <FormCreateSale id={actionId} />
                  )}

                  <Form {...formRebuild}>
                    <form
                      onSubmit={formRebuild.handleSubmit(onSubmitRebuild)}
                      className="space-y-2"
                    >
                      <FormField
                        control={formRebuild.control}
                        name="reason"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Причина пересборки</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Укажите причину пересборки"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button variant="destructive">Пересобрать</Button>
                    </form>
                  </Form>

                  <Form {...formRefuse}>
                    <form
                      onSubmit={formRefuse.handleSubmit(onSubmitRefuse)}
                      className="space-y-2"
                    >
                      <FormField
                        control={formRefuse.control}
                        name="refuse"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Причина отказа</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Укажите причину отказа"
                                {...field}
                                className="w-full"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button variant="destructive">Отказ</Button>
                    </form>
                  </Form>
                </div>
              )}
              {actionProcessing === 'Продажа' && (
                <div className="flex flex-col gap-2 1024:items-start">
                  <Button variant="primary" onClick={() => openAddTkModal(actionId)}>
                    Информация о тк
                  </Button>
                  <Button
                    variant="primary"
                    disabled={actionSubProcessng != 'Готов'}
                    onClick={() =>
                      moveAppSale.mutate({
                        id: actionId,
                        processing: 'Упаковка',
                        sub_processing: '1',
                        type: 'Продажа',
                        move_myself: false,
                        comment_for_collector: '',
                      })
                    }
                  >
                    Отправить на упаковку
                  </Button>
                  <Button
                    variant="primary"
                    disabled={actionSubProcessng != 'Готов'}
                    onClick={() =>
                      moveAppSale.mutate({
                        id: actionId,
                        processing: 'Упаковка',
                        sub_processing: '0',
                        type: 'Продажа',
                        move_myself: false,
                        comment_for_collector: '',
                      })
                    }
                  >
                    Отдать клиенту
                  </Button>
                </div>
              )}

              {actionProcessing === 'Упаковка' && (
                <div className="flex flex-col gap-2 1024:items-start">
                  <Button variant="primary" onClick={() => openAddTkModal(actionId)}>
                    Информация о тк
                  </Button>
                  <Button
                    variant="primary"
                    disabled={actionSubProcessng != 'Готов'}
                    onClick={() =>
                      moveAppSale.mutate({
                        id: actionId,
                        processing: 'Отправка в тк',
                        sub_processing: '1',
                        type: 'Продажа',
                        move_myself: false,
                        comment_for_collector: '',
                      })
                    }
                  >
                    Отправить в тк
                  </Button>
                  <Button
                    variant="primary"
                    disabled={actionSubProcessng != 'Готов'}
                    onClick={() =>
                      moveAppSale.mutate({
                        id: actionId,
                        processing: 'Заказ получен',
                        sub_processing: '0',
                        type: 'Продажа',
                        move_myself: false,
                        comment_for_collector: '',
                      })
                    }
                  >
                    Отдать клиенту
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Закрыть
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
