import { SignInForm } from '@/features/auth'
import { UiFormPageLayout } from '@/shared/ui/layouts/ui-form-page-layout'

export function SignInPage() {
  return (
    <main>
      <UiFormPageLayout title={'Вход'} form={<SignInForm />} />
    </main>
  )
}
