import { Button } from '@/shared/ui/components/ui/button'
import { useSignOut } from '../../model/use-sign-out'

export function SignOutButton() {
  const signOut = useSignOut()
  return (
    <Button
      className="text-lg py-6 font-semibold 1024:text-sm 1024:py-4"
      variant="secondary"
      onClick={() => signOut.singOut({})}
      disabled={signOut.isLoading}
    >
      Выйти
    </Button>
  )
}
