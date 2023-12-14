import { useRefusalApplication } from '@/entities/panel/queries'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'
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
  const refuse = useRefusalApplication()
  const formRefuse = useForm<z.infer<typeof FormSchemaRefuse>>({
    resolver: zodResolver(FormSchemaRefuse),
    defaultValues: {
      refuse: '',
    },
  })
  function onSubmitRefuse(data: z.infer<typeof FormSchemaRefuse>) {
    refuse.mutate({ id: id, reason: data.refuse })
  }
  return (
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
          {refuse.isPending ? <UiSpinner /> : 'Отказ'}
        </Button>
      </form>
    </Form>
  )
}
