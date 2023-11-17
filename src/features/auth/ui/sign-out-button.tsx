import { useSignOut } from '../model/use-sign-out'

export function SignOutButton() {
  const { isLoading, singOut } = useSignOut()
  return (
    <button
      className="py-2 text-center hover:bg-blue-400 transition-all font-normal px-4 hover:text-white hover:font-semibold"
      onClick={() => singOut({})}
      disabled={isLoading}
    >
      Выйти
    </button>
  )
}
