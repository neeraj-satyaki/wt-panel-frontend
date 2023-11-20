import { SessionInfoDto } from '@/shared/api/generated'

export const UiProfileUser = ({ data }: { data: SessionInfoDto }) => {
  return (
    <div className="flex gap-2">
      <div className="w-52 h-52 rounded-lg bg-gray-200"></div>
      <div className="flex flex-col gap-2">
        <div className="text-base font-semibold">{data.name}</div>
        <div className="text-sm text-gray-600">Личный номер: {data.personal_phone}</div>
        <div className="text-sm text-gray-600">Рабочий номер: {data.work_phone}</div>
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <div>Должность:</div>
          <div className="px-4 py-2 rounded-lg bg-gray-200 text-sm hover:bg-gray-300 transition-all hover:text-black">
            {data.post}
          </div>
        </div>
        <div className="flex gap-2 items-center text-sm text-gray-600">
          <div>Роли:</div>
          <div className="flex gap-2">
            {data.roles.map((role, i: number) => {
              return (
                <div
                  key={i}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-sm hover:bg-gray-300 transition-all hover:text-black"
                >
                  {role.title}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
