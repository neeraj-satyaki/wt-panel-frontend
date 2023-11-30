import { SignInForm } from '@/features/auth'
import { UiFormPageLayout } from '@/shared/ui/layouts/ui-form-page-layout'
export function SignInPage() {
  return <UiFormPageLayout title={'Вход'} form={<SignInForm />} />
}
