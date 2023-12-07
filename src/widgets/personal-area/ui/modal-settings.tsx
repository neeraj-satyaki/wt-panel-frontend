import { SignOutButton } from '@/features/auth'

export default function ModalSettings() {
  return (
    <div className="absolute right-0 flex flex-col shadow rounded-lg overflow-hidden border bg-white mt-2">
      <SignOutButton />
    </div>
  )
}
