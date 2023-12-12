import { Button } from '@/shared/ui/components/ui/button'

export function Filters() {
  return (
    <div className="flex flex-col gap-2 text-[12px]">
      <div className="flex gap-2 overflow-auto">
        <Button variant="primary" className="px-4 py-2 whitespace-nowrap">
          Все (100000)
        </Button>
        <Button variant="outline" className="px-4 py-2 whitespace-nowrap">
          Прошли конвеер (532)
        </Button>
      </div>
      <div className="flex gap-2 overflow-auto">
        <Button variant="primary" className="px-4 py-2 whitespace-nowrap">
          Двигатели (45)
        </Button>
        <Button variant="outline" className="px-4 py-2 whitespace-nowrap">
          Кабины (30)
        </Button>
        <Button variant="outline" className="px-4 py-2 whitespace-nowrap">
          Кронштейны (145)
        </Button>
        <Button variant="outline" className="px-4 py-2 whitespace-nowrap">
          Колёса (633)
        </Button>
        <Button variant="outline" className="px-4 py-2 whitespace-nowrap">
          Фары (274)
        </Button>
        <Button variant="outline" className="px-4 py-2 whitespace-nowrap">
          Баки (273)
        </Button>
      </div>
    </div>
  )
}
