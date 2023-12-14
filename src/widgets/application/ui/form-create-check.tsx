import { useCreateCheck, useGetOrgsBills } from '@/entities/panel/queries'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/components/ui/select'
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import AnimateSuccess from '@/shared/ui/animations/success'
import AnimateError from '@/shared/ui/animations/error'
import * as z from 'zod'
import { queryClient } from '@/shared/api/query-client'
import { useEffect, useState } from 'react'

const FormSchema = z.object({
  id: z.string(),
  org: z.string({
    required_error: 'Обзательное поле',
  }),
  bill: z.string({
    required_error: 'Обязательное поле',
  }),
})

export default function FormCreateCheck({ id }: { id: string }) {
  const orgBills = useGetOrgsBills()
  const createCheck = useCreateCheck()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: id,
    },
  })
  const [open, setOpen] = useState(false)

  function onSubmit(values: z.infer<typeof FormSchema>) {
    createCheck.mutate(values)
  }

  useEffect(() => {
    if (!open) {
      createCheck.reset()
      queryClient.invalidateQueries({
        queryKey: ['application'],
      })
      setOpen(false)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Создание счёта</DialogTitle>
        </DialogHeader>
        <Dialog>
          <DialogContent className="max-w-[800px] w-full">
            <DialogHeader>
              <DialogTitle>Отсканируйте паллет</DialogTitle>
            </DialogHeader>
            {createCheck.isPending ? <UiSpinner className="my-20 w-full" /> : null}
            {createCheck.isError ? (
              <div className="flex flex-col gap-2 items-center">
                <AnimateError />
                <div>Произошла ошибка</div>
              </div>
            ) : null}
            {createCheck.isSuccess ? (
              <div className="flex flex-col gap-2 items-center">
                <AnimateSuccess />
                <div>Успешно</div>
              </div>
            ) : null}
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Закрыть
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {!createCheck.isPending && !createCheck.isError && !createCheck.isSuccess ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="org"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Организация</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите организацию" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {orgBills.data?.orgs.map((item, i) => (
                          <SelectItem value={item.id} key={i}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Счёт</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите счёт" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {orgBills.data?.bills.map((item, i) => (
                          <SelectItem value={item.id} key={i}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant={'primary'} className="font-semibold">
                Создать
              </Button>
            </form>
          </Form>
        ) : null}
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
