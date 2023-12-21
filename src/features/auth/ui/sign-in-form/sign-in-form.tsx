import { useShowPassword } from '../../model/use-sign-in-form'
import { Button } from '@/shared/ui/components/ui/button'
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
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { authControllerSignInOneC } from '@/shared/api/generated'
import { routes } from '@/shared/constants/routing'
import { Input } from '@/shared/ui/components/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/ui/card'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import * as z from 'zod'

interface CustomError extends Error {
  response?: {
    data: {
      message: string
      error: string
      statusCode: number
    }
  }
}
const FormSchema = z.object({
  phone: z.string({ required_error: 'Обязательное поле' }).min(12, {
    message: 'Минимальное кол-во символов 12',
  }),
  password: z.string({ required_error: 'Обязательное поле' }).min(2, {
    message: 'Минимальное кол-во символов 2',
  }),
})

export const SignInForm = () => {
  const showPassword = useShowPassword()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: '+7',
    },
  })
  const router = useRouter()

  const signInMutation = useMutation({
    mutationFn: authControllerSignInOneC,
    onSuccess() {
      router.push(routes.PERSONAL_AREA)
    },
  })
  function onSubmit(values: z.infer<typeof FormSchema>) {
    signInMutation.mutate(values)
  }

  const errorMessage = signInMutation.error
    ? (signInMutation.error as CustomError).response?.data.message ||
      'Произошла ошибка, попробуйте позже'
    : undefined

  return (
    <Card className="max-w-[400px] w-full shadow-lg">
      <CardHeader>
        <CardTitle>Вход в аккаунт</CardTitle>
        <CardDescription>Введите данные чтобы войти в свой аккаунт.</CardDescription>
      </CardHeader>
      <CardContent>
        {errorMessage && <div className="text-rose-500">{errorMessage}</div>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Номер телефона</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Введите номер телефона"
                      {...field}
                      className={`w-full ${
                        form.formState.errors.phone ? 'border-red-400 border' : ''
                      }`}
                      disabled={signInMutation.isPending}
                      maxLength={12}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Пароль</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        placeholder="Введи пароль"
                        {...field}
                        className={`w-full ${
                          form.formState.errors.password ? 'border-red-400 border' : ''
                        }`}
                        type={showPassword.isShow ? 'text' : 'password'}
                        disabled={signInMutation.isPending}
                      />
                    </FormControl>
                    <div onClick={() => showPassword.toggle()} className="cursor-pointer">
                      {showPassword.isShow ? <EyeIcon /> : <EyeOffIcon />}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              className="font-semibold w-full"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending ? <UiSpinner /> : 'Войти'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
