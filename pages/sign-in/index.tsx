import { nonAuthProtectedPage } from '@/features/auth/ui/protected/non-auth-protected'
import { SignInPage } from '@/pages/sign-in'
import Head from 'next/head'

function SignIn() {
  return (
    <>
      <Head>
        <title>Авторизация</title>
      </Head>
      <SignInPage />
    </>
  )
}

export default nonAuthProtectedPage(SignIn)
