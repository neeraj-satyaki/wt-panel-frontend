import {
  CreateAppBtn,
  RebuidBtn,
  CreateSaleBtn,
  SendPackage,
  GiveToClient,
  SendToTk,
  RefuseBtn,
} from '@/features/(work-place)/action-v2'
import { AssemblyBtn } from '@/features/(work-place)/action-v2/ui/assembly-btn'
import { AssemblyBtnMyself } from '@/features/(work-place)/action-v2/ui/assembly-btn-myself'
import { DataDto } from '@/shared/api/generated'

type Props = {
  item: DataDto
}

export function FeatureSet({ item }: Props) {
  const validProcessings = ['Обращение', 'Заявка', 'Сборка']
  const closeTitles = ['Отправка в тк', 'Отправлено клиенту', 'Заказ получен']

  if (closeTitles.includes(item.processing)) return

  return (
    <div className="flex flex-col gap-2">
      {item.processing === 'Обращение' && <CreateAppBtn id={item.id} />}
      {item.processing === 'Заявка' && (
        <>
          <AssemblyBtn id={item.id} />
          <AssemblyBtnMyself id={item.id} />
        </>
      )}
      {item.processing === 'Сборка' && (
        <>
          <RebuidBtn id={item.id} disabled={item.sub_processing != 'Готов'} />
          <CreateSaleBtn id={item.id} disabled={item.sub_processing != 'Готов'} />
        </>
      )}
      {item.processing === 'Продажа' && (
        <>
          <SendPackage id={item.id} disabled={item.sub_processing != 'Готов'} />
          <GiveToClient id={item.id} disabled={item.sub_processing != 'Готов'} />
        </>
      )}
      {item.processing === 'Упаковка' && (
        <>
          <SendToTk id={item.id} disabled={item.sub_processing != 'Готов'} />
          <GiveToClient id={item.id} disabled={item.sub_processing != 'Готов'} />
        </>
      )}
      {validProcessings.includes(item.processing) && <RefuseBtn id={item.id} />}
    </div>
  )
}
