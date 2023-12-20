import { UiHeading } from '@/shared/ui/components/ui-heading'
import { UploadVideo } from './upload-video'
import { ListVideos } from './list-videos'

type Props = {}

export function Videos({}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <UiHeading level={'4'}>Видео ({25})</UiHeading>
      <UploadVideo />
      <ListVideos />
    </div>
  )
}
