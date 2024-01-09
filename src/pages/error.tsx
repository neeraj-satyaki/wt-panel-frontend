import AnimateError from '@/shared/ui/animations/error'
import { Button } from '@/shared/ui/components/ui/button'
import { useRouter } from 'next/router'

export function ErrorPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen items-center flex justify-center overflow-auto">
      <div className="flex flex-col gap-4 items-center">
        <AnimateError />
        <h1 className="text-3xl font-semibold">Ошибка</h1>
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
