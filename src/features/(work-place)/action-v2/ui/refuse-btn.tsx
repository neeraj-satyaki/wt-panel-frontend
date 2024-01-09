import { useRefusalApplication } from '@/entities/panel/api'
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/components/ui/form'
import { Input } from '@/shared/ui/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import * as z from 'zod'

type Props = {
  id: string
}
const FormSchemaRefuse = z.object({
  refuse: z.string().refine((data) => data.trim() !== '', {
    message: 'Укажите причину отказа.',
  }),
})
export function RefuseBtn({ id }: Props) {
  const [isShow, setIsShow] = useState(false)

  const refuse = useRefusalApplication()
  const formRefuse = useForm<z.infer<typeof FormSchemaRefuse>>({
    resolver: zodResolver(FormSchemaRefuse),
    defaultValues: {
      refuse: '',
    },
  })
  function onSubmitRefuse(data: z.infer<typeof FormSchemaRefuse>) {
    refuse.mutate({ id: id, reason: data.refuse })
    setIsShow(false)
  }
  return (
    <Dialog open={isShow} onOpenChange={setIsShow}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="text-xl font-semibold h-16">
          Отказ
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px] w-full">
        <DialogHeader>
          <DialogTitle>Отказ</DialogTitle>
        </DialogHeader>
        <Form {...formRefuse}>
          <form onSubmit={formRefuse.handleSubmit(onSubmitRefuse)} className="space-y-2">
            <FormField
              disabled={refuse.isPending}
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
            <Button variant="destructive" disabled={refuse.isPending}>
              {refuse.isPending ? 'Загрузка...' : 'Отказ'}
            </Button>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="text-xl font-semibold h-16"
            >
              Закрыть
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
