import { UiButton } from '@/shared/ui/components/ui-button'
import { UiTextField } from '@/shared/ui/components/ui-text-field'
import { useShowPassword, useSignInForm } from '../model/use-sign-in-form'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { IconEye } from '@/shared/ui/icons/icon-eye'
import { IconClosedEye } from '@/shared/ui/icons/icon-closed-eye'

export const SignInForm = () => {
  const { handleSubmit, isLoading, register, errorMessage } = useSignInForm()
  const { isShow, open, close } = useShowPassword()

  return (
    <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
      {errorMessage && <div className="text-rose-500">{errorMessage}</div>}

      <UiTextField
        label="Номер телефона"
        inputProps={{
          placeholder: 'Введите номер телефона',
          ...register('phone', { required: true }),
        }}
      />
      <UiTextField
        label="Пароль"
        className="w-full"
        inputProps={{
          placeholder: 'Введите пароль',
          type: isShow ? 'text' : 'password', // Изменяем тип input в зависимости от isShow
          ...register('password', { required: true }),
        }}
        component={
          <div className="flex gap-2 items-center text-gray-400 px-4">
            {isShow ? (
              <div
                onClick={() => close()}
                className="flex items-center cursor-pointer"
              >
                <IconClosedEye />
              </div>
            ) : (
              <div
                onClick={() => open()}
                className="flex items-center cursor-pointer"
              >
                <IconEye />
              </div>
            )}
          </div>
        }
      />

      <UiButton variant={'primary'} disabled={isLoading} className="py-3">
        {isLoading ? <UiSpinner /> : 'Войти'}
      </UiButton>
    </form>
  )
}
