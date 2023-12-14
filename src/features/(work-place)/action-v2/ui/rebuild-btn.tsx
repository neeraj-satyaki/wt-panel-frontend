import { useMoveAppSale } from '@/entities/panel-v2'
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
  disabled?: boolean
}
const FormSchemaRebuild = z.object({
  reason: z.string().refine((data) => data.trim() !== '', {
    message: 'Укажите причину отказа.',
  }),
})
export function RebuidBtn({ id, disabled }: Props) {
  const moveAppSale = useMoveAppSale()
  const formRebuild = useForm<z.infer<typeof FormSchemaRebuild>>({
    resolver: zodResolver(FormSchemaRebuild),
    defaultValues: {
      reason: '',
    },
  })
  function onSubmitRebuild(data: z.infer<typeof FormSchemaRebuild>) {
    moveAppSale.mutate({
      id: id,
      processing: 'Сборка',
      sub_processing: '1',
      type: 'Заявка',
      move_myself: false,
      comment_for_collector: data.reason,
    })
  }
  return (
    <Form {...formRebuild}>
      <form onSubmit={formRebuild.handleSubmit(onSubmitRebuild)} className="space-y-2">
        <FormField
          disabled={moveAppSale.isPending || disabled}
          control={formRebuild.control}
          name="reason"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Причина пересборки</FormLabel>
              <FormControl>
                <Input placeholder="Укажите причину" {...field} className="w-auto" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="destructive" disabled={moveAppSale.isPending || disabled}>
          {moveAppSale.isPending ? <UiSpinner /> : 'Пересобрать'}
        </Button>
      </form>
    </Form>
  )
}
