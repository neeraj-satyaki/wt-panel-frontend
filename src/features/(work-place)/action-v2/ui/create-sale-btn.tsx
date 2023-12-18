import { useGetOrgsBills } from '@/entities/panel/queries'
import { useCreateSaleMutation } from '@/entities/sale/queries'
import { Button } from '@/shared/ui/components/ui/button'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { cn } from '@/shared/lib'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Calendar } from '@/shared/ui/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'

const FormSchema = z.object({
  id: z.string(),
  org: z.string({
    required_error: 'Обзательное поле',
  }),
  bill: z.string({
    required_error: 'Обзательное поле',
  }),
  date: z.date({
    required_error: 'Обзательное поле',
  }),
})

export function CreateSaleBtn({ id, disabled }: { id: string; disabled?: boolean }) {
  const orgBills = useGetOrgsBills()
  const createSaleMutation = useCreateSaleMutation()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: id,
    },
  })

  function onSubmit(values: z.infer<typeof FormSchema>) {
    createSaleMutation.mutate({
      id: values.id,
      org: values.org,
      bill: values.bill,
      date: format(values.date, 'yyyy-MM-dd'),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="org"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Организация</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={createSaleMutation.isPending || disabled}
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
                disabled={createSaleMutation.isPending || disabled}
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
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Примерная дата оплаты</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={createSaleMutation.isPending || disabled}
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'yyyy-MM-dd')
                      ) : (
                        <span>Выберите дату</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date('1900-01-01')
                    }
                    locale={ru}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="default"
          className="font-semibold"
          disabled={createSaleMutation.isPending || disabled}
        >
          {createSaleMutation.isPending ? <UiSpinner /> : 'Создать'}
        </Button>
      </form>
    </Form>
  )
}
