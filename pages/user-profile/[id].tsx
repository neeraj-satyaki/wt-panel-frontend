import { authProtectedPage } from '@/features/auth'
import { UserProfilePage } from '@/pages/user-profile'
import Head from 'next/head'
import { useRouter } from 'next/router'

function UserProfile() {
  const router = useRouter()
  const id = router.query.id

  return (
    <>
      <Head>
        <title>Пользователь № {id}</title>
      </Head>
      <UserProfilePage />
    </>
  )
}

export default authProtectedPage(UserProfile)
