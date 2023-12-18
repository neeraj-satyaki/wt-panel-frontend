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
import * as z from 'zod'
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

export function FormCreateCheck({ id }: { id: string }) {
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
    if (createCheck.isSuccess || createCheck.isError) {
      setOpen(false)
      createCheck.reset()
    }
  }, [createCheck.isPending])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          Создать счёт
        </Button>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={createCheck.isPending}
                  >
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={createCheck.isPending}
                  >
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
            <Button
              type="submit"
              variant="default"
              className="font-semibold"
              disabled={createCheck.isPending}
            >
              {createCheck.isPending ? <UiSpinner /> : 'Создать'}
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
