import { InvoicePrintring } from '../../../features/(application)/payment-account-printing/ui/invoice-printing'
import { FormCreateCheck } from '@/features/(application)/form-create-check'
import {
  BackToWork,
  Complete,
  GetToWork,
  PageForClient,
  SendToCLient,
} from '@/features/(application)/action'
import { ApplicationResponseDto } from '@/shared/api/generated'

type Props = {
  application: ApplicationResponseDto
  id: string
}

export default function AppFeatBlock({ application, id }: Props) {
  return (
    <div>
      {application.info.processing != 'Обращение' &&
        application.info.processing != 'Заявка' && (
          <div className="flex gap-2">
            {application.info.sub_processing !== 'Ожидание' && (
              <BackToWork id={id} processing={application.info.processing} />
            )}
            {application.info.sub_processing === 'Ожидание' && (
              <GetToWork id={id} processing={application.info.processing} />
            )}
            {!application.info.numCheck && <FormCreateCheck id={application.info.id} />}
            <SendToCLient id={application.info.id} />
            <PageForClient id={application.info.id} />
            {application.info.numCheck && (
              <InvoicePrintring id={application.info.numCheck} />
            )}
            {application.info.sub_processing === 'Выполняется' && (
              <Complete
                id={id}
                processing={application.info.processing}
                availability_of_photos={
                  !application.data.every((item) => item.photos.length > 0)
                }
              />
            )}
          </div>
        )}
    </div>
  )
}
