import { UiButton } from '@/shared/ui/components/ui-button'

export function Filters() {
  return (
    <div className="flex flex-col gap-2 text-[12px]">
      <div className="flex gap-2">
        <UiButton variant="primary" className="px-4 py-2">
          Все (100000)
        </UiButton>
        <UiButton variant="outlined" className="px-4 py-2 font-medium">
          Прошли конвеер (532)
        </UiButton>
      </div>
      <div className="flex gap-2">
        <UiButton variant="primary" className="px-4 py-2">
          Двигатели (45)
        </UiButton>
        <UiButton variant="outlined" className="px-4 py-2 font-medium">
          Кабины (30)
        </UiButton>
        <UiButton variant="outlined" className="px-4 py-2 font-medium">
          Кронштейны (145)
        </UiButton>
        <UiButton variant="outlined" className="px-4 py-2 font-medium">
          Колёса (633)
        </UiButton>
        <UiButton variant="outlined" className="px-4 py-2 font-medium">
          Фары (274)
        </UiButton>
        <UiButton variant="outlined" className="px-4 py-2 font-medium">
          Баки (273)
        </UiButton>
      </div>
    </div>
  )
}
