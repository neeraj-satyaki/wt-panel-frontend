import { UiHeading } from '@/shared/ui/components/ui-heading'
import { Button } from '@/shared/ui/components/ui/button'

type Props = {
  endLearn: any
}
export function LearningWorkPlace({ endLearn }: Props) {
  return (
    <div className="flex flex-col gap-8 text-center 1512:justify-center min-h-screen items-center">
      <UiHeading level={'1'}>Добро пожаловать в рабочее пространство</UiHeading>
      <iframe
        src="https://www.youtube.com/embed/xNRJwmlRBNU?si=KNMf8ikFDk7mZkDj"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        className="max-w-[1200px] w-full h-[300px] rounded-lg 744:h-[400px] 1024:h-[500px] 1280:h-[600px]"
      ></iframe>

      <Button variant="default" onClick={() => endLearn()}>
        Приступить к работе
      </Button>
    </div>
  )
}
