import { SessionInfoDto } from '@/shared/api/generated'
import { IconAnonimUser } from '../icons/icon-anonim-user'
import Image from 'next/image'
import { useGetAvatarUser } from '@/entities/user'

type Props = {
  data: SessionInfoDto
}

export const UiProfileUser = ({ data }: Props) => {
  const avatarUser = useGetAvatarUser(data.id)

  return (
    <div className="flex flex-col 744:flex-row gap-4 w-full">
      <div className="bg-gray-100 rounded-lg flex items-center justify-center flex-col w-1/2 744:w-44 744:h-64">
        {avatarUser.isLoading && <div>Загрузка...</div>}
        {!avatarUser.isLoading && !avatarUser.data && <IconAnonimUser />}
        {avatarUser.isError && (
          <div className="text-center">Фотоография не загружена</div>
        )}
        {avatarUser.data && (
          <Image
            src={`data:image/jpeg;base64,${avatarUser.data}`}
            alt={`avatar-${data.name}`}
            width={1920}
            height={1080}
            className="rounded-lg object-cover w-full h-full"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-base font-semibold">{data.name}</div>
        <div className="text-sm text-gray-600">Личный номер: {data.personal_phone}</div>
        <div className="text-sm text-gray-600">Рабочий номер: {data.work_phone}</div>
        <div className="text-sm text-gray-600 flex flex-col items-start gap-2">
          <div>Должность:</div>
          <div className="px-4 py-2 rounded-lg bg-gray-200 text-sm hover:bg-gray-300 transition-all hover:text-black">
            {data.post}
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <div>Роли:</div>
          <div className="flex items-center w-full gap-2 overflow-auto">
            {data.roles.length > 0
              ? data.roles.map((role, i: number) => {
                  return (
                    <div
                      key={i}
                      className="px-4 py-2 rounded-lg bg-gray-200 text-sm hover:bg-gray-300 transition-all hover:text-black"
                    >
                      {role.title}
                    </div>
                  )
                })
              : 'Отсутсвуют'}
          </div>
        </div>
      </div>
    </div>
  )
}
