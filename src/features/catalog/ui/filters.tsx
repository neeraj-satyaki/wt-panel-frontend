import { UiButton } from '@/shared/ui/components/ui-button'

export function Filters() {
  return (
    <div className="flex flex-col gap-2 text-[12px]">
      <div className="flex gap-2 overflow-auto">
        <UiButton variant="primary" className="px-4 py-2 whitespace-nowrap">
          Все (100000)
        </UiButton>
        <UiButton variant="outlined" className="px-4 py-2 whitespace-nowrap">
          Прошли конвеер (532)
        </UiButton>
      </div>
      <div className="flex gap-2 overflow-auto">
        <UiButton variant="primary" className="px-4 py-2 whitespace-nowrap">
          Двигатели (45)
        </UiButton>
        <UiButton variant="outlined" className="px-4 py-2 whitespace-nowrap">
          Кабины (30)
        </UiButton>
        <UiButton variant="outlined" className="px-4 py-2 whitespace-nowrap">
          Кронштейны (145)
        </UiButton>
        <UiButton variant="outlined" className="px-4 py-2 whitespace-nowrap">
          Колёса (633)
        </UiButton>
        <UiButton variant="outlined" className="px-4 py-2 whitespace-nowrap">
          Фары (274)
        </UiButton>
        <UiButton variant="outlined" className="px-4 py-2 whitespace-nowrap">
          Баки (273)
        </UiButton>
      </div>
    </div>
  )
}
