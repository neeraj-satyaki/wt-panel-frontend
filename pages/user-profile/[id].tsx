import { UserProfilePage } from '@/pages/user-profile'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function UserProfile() {
  const router = useRouter()
  const id = router.query.id

  if (!id) {
    return null
  }

  return (
    <>
      <Head>
        <title>Пользователь № {id}</title>
      </Head>
      <UserProfilePage />
    </>
  )
}
