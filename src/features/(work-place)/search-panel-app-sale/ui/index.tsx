import { useAppOrSaleStore, useGetAppOrSales } from '@/entities/panel-v2'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/components/ui/form'
import { Input } from '@/shared/ui/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchemaRebuild = z.object({
  searchQuery: z.string(),
})
export function SearchPanelAppSaleFeat() {
  const { setQ } = useAppOrSaleStore()
  const { currentCategory, type, page, q, count } = useAppOrSaleStore()

  const appOrSale = useGetAppOrSales(
    currentCategory,
    type,
    page.toString(),
    count.toString(),
    q,
  )
  const formRebuild = useForm<z.infer<typeof FormSchemaRebuild>>({
    resolver: zodResolver(FormSchemaRebuild),
    defaultValues: {
      searchQuery: q,
    },
  })
  function onSubmitRebuild(data: z.infer<typeof FormSchemaRebuild>) {
    appOrSale.refetch()
  }

  return (
    <Form {...formRebuild}>
      <form
        onSubmit={formRebuild.handleSubmit(onSubmitRebuild)}
        className="flex justify-between gap-2"
      >
        <FormField
          control={formRebuild.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  disabled={appOrSale.isFetching}
                  placeholder="Введите № заявки/продажи"
                  {...field}
                  className="w-full"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="default" disabled={appOrSale.isFetching}>
          {appOrSale.isFetching ? <UiSpinner /> : 'Найти'}
        </Button>
      </form>
    </Form>
  )
}
