import { UiButton } from '@/shared/ui/components/ui-button'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { useShowPassword, useSignInForm } from '../../model/use-sign-in-form'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { ShowPasswordBtn } from './show-password-btn'

export const SignInForm = () => {
  const signInFrom = useSignInForm()
  const showPassword = useShowPassword()

  return (
    <form className="flex flex-col gap-5 w-full" onSubmit={signInFrom.handleSubmit}>
      {signInFrom.errorMessage && (
        <div className="text-rose-500">{signInFrom.errorMessage}</div>
      )}
      <UiTextField
        label="Номер телефона"
        inputProps={{
          placeholder: 'Введите номер телефона',
          ...signInFrom.register('phone', {
            required: true,
          }),
        }}
      />
      <UiTextField
        label="Пароль"
        className="w-full"
        inputProps={{
          placeholder: 'Введите пароль',
          type: showPassword.isShow ? 'text' : 'password',
          ...signInFrom.register('password', {
            required: true,
          }),
        }}
        component={
          <ShowPasswordBtn
            isShow={showPassword.isShow}
            open={showPassword.open}
            close={showPassword.close}
          />
        }
      />
      <UiButton variant={'primary'} disabled={signInFrom.isLoading} className="py-3">
        {signInFrom.isLoading ? <UiSpinner /> : 'Войти'}
      </UiButton>
    </form>
  )
}
