import { useShowPassword, useSignInForm } from '../../model/use-sign-in-form'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
import { ShowPasswordBtn } from './show-password-btn'

export const SignInForm = () => {
  const signInFrom = useSignInForm()
  const showPassword = useShowPassword()

  return (
    <>
      {signInFrom.errorMessage && (
        <div className="text-rose-500">{signInFrom.errorMessage}</div>
      )}
      <form className="flex flex-col gap-5 w-full" onSubmit={signInFrom.handleSubmit}>
        <Input
          placeholder="Введите номер телефона"
          {...signInFrom.register('phone', {
            required: true,
          })}
        />
        <div className="flex">
          <Input
            className="w-full"
            placeholder="Введите пароль"
            type={showPassword.isShow ? 'text' : 'password'}
            {...signInFrom.register('password', {
              required: true,
            })}
          />
          <ShowPasswordBtn
            isShow={showPassword.isShow}
            open={showPassword.open}
            close={showPassword.close}
          />
        </div>
        <Button variant="default" disabled={signInFrom.isLoading}>
          {signInFrom.isLoading ? <UiSpinner /> : 'Войти'}
        </Button>
      </form>
    </>
  )
}
