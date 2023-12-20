import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'

type Props = {}

export function UploadVideo({}: Props) {
  return (
    <div className="text-sm">
      <form className="flex gap-2 flex-col 430:flex-row">
        <Input type="file" multiple={true} required={true} />
        <Button variant="default" type="submit">
          Добавить
        </Button>
      </form>
    </div>
  )
}
