import { SignInForm } from '@/features/auth'
import { UiFormPageLayout } from '@/shared/ui/layouts/ui-form-page-layout'
import Image from 'next/image'
export function SignInPage() {
  return (
    <main>
      <UiFormPageLayout
        title={'Вход'}
        form={<SignInForm />}
        background={
          <Image
            width={1920}
            height={1080}
            src={
              'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt={'company'}
            className="w-full h-full object-cover"
          />
        }
      />
    </main>
  )
}
