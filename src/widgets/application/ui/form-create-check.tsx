import { useCreateCheck, useGetOrgsBills } from '@/entities/panel/queries'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/components/ui/button'

import * as z from 'zod'

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

const FormSchema = z.object({
  id: z.string(),
  org: z.string().refine((data) => data.trim() !== '', {
    message: 'Введите организацию.',
  }),
  bill: z.string().refine((data) => data.trim() !== '', {
    message: 'Введите счёт.',
  }),
})

export default function FormCreateCheck({ id }: { id: string }) {
  const orgBills = useGetOrgsBills()
  const createCheck = useCreateCheck()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: id,
      org: '',
      bill: '',
    },
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    createCheck.mutate(values)
  }

  return (
    <Dialog onOpenChange={() => createCheck.reset()}>
      <DialogTrigger asChild>
        <Button variant="outline">Добавить</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>Создание счёта</DialogTitle>
        </DialogHeader>
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
