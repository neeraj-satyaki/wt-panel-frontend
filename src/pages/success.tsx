import Success from '@/shared/ui/animations/success'
import { Button } from '@/shared/ui/components/ui/button'
import { useRouter } from 'next/router'

export function SuccessPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen items-center flex justify-center overflow-auto">
      <div className="flex flex-col gap-4 items-center">
        <Success />
        <h1 className="text-3xl font-semibold">Успешно</h1>
        <Button
          onClick={() => router.back()}
          variant="primary"
          className="text-3xl font-bold w-24 h-14"
        >
          Ок
        </Button>
      </div>
    </main>
  )
}
