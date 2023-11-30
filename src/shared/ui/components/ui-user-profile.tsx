import { SessionInfoDto } from '@/shared/api/generated'
import { IconAnonimUser } from '../icons/icon-anonim-user'
import Image from 'next/image'
import { UiSpinner } from './ui-spinner'
import { useGetAvatarUser } from '@/entities/user'

type Props = {
  data: SessionInfoDto
}

export const UiProfileUser = ({ data }: Props) => {
  const avatarUser = useGetAvatarUser(data.id)

  return (
    <div className="flex gap-4">
      <div className="max-w-[200px] w-full h-[280px] bg-gray-100 rounded-lg flex items-center justify-center flex-col">
        {avatarUser.isLoading && <UiSpinner />}
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
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <div>Должность:</div>
          <div className="px-4 py-2 rounded-lg bg-gray-200 text-sm hover:bg-gray-300 transition-all hover:text-black">
            {data.post}
          </div>
        </div>
        <div className="flex gap-2 items-center text-sm text-gray-600">
          <div>Роли:</div>
          <div className="flex gap-2">
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
