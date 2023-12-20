import { useEditProduct } from '@/entities/products'
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
import { Textarea } from '@/shared/ui/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z.object({
  comment: z.string(),
  cost: z.number(),
})

type Props = {
  id: string
  comment: string
  cost: number
}

export function EditProduct({ id, comment, cost }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: comment,
      cost: cost,
    },
  })

  const editProduct = useEditProduct()

  function onSubmit(values: z.infer<typeof FormSchema>) {
    editProduct.mutate({
      id: id,
      comment: values.comment,
      cost: values.cost,
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Комментарий</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Укажите комментарий"
                    {...field}
                    className="w-full"
                    disabled={editProduct.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Цена</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input
                      placeholder="Укажите цену"
                      {...field}
                      className="w-full"
                      type="number"
                      disabled={editProduct.isPending}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="font-semibold w-full"
            disabled={editProduct.isPending}
          >
            {editProduct.isPending ? <UiSpinner /> : 'Отправить'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
