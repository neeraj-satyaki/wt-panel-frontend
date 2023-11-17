import clsx from 'clsx'
import { Montserrat, Roboto_Flex } from 'next/font/google'
import { headings } from '../config'
import { Tr } from './tr'
import { UiSpinner } from '@/shared/ui/components/ui-spinner'
import { ApplicationSaleDto } from '@/shared/api/generated'
import { UiButton } from '@/shared/ui/components/ui-button'
import { IconArrow } from '@/shared/ui/icons/icon-arrow'

const roboto = Roboto_Flex({
  subsets: ['latin'],
  weight: '300',
})
const montseratt = Montserrat({
  subsets: ['latin'],
})

export const Table = ({
  data,
  isLoading,
  isError,
  nextPage,
  prevPage,
  currentPage,
}: {
  data: ApplicationSaleDto | undefined
  isLoading: boolean
  isError: boolean
  nextPage: Function
  prevPage: Function
  currentPage: number
}) => {
  if (isLoading) {
    return (
      <div className="w-full h-52 flex items-center justify-center">
        <UiSpinner />
      </div>
    )
  }
  if (!data) {
    return <div>Not data!</div>
  }
  if (isError) {
    return <div>Error</div>
  }
  return (
    <div
      className={clsx(roboto.className, 'w-full text-sm flex flex-col gap-4')}
    >
      <table className="w-full">
        <thead>
          <tr className="bg-[#E1E1E1]">
            {headings.map((heading, i) => (
              <th className={`border border-[#A9AABC] py-2`} key={i}>
                {heading.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.data.map((item, i) => {
            return <Tr item={item} key={i} />
          })}
        </tbody>
      </table>
      {data.info.pages > 1 && (
        <div
          className={`w-full flex justify-center gap-2 flex-col items-center ${montseratt.className}`}
        >
          <span>
            {currentPage}/{data.info.pages}
          </span>
          <div className="flex gap-2">
            <UiButton
              disabled={currentPage === 1}
              variant="primary"
              onClick={() => prevPage()}
              className="px-6 py-3"
            >
              <IconArrow direction="left" />
            </UiButton>
            <UiButton
              disabled={currentPage === data.info.pages}
              variant="primary"
              onClick={() => nextPage()}
              className="px-6 py-3"
            >
              <IconArrow direction="right" />
            </UiButton>
          </div>
        </div>
      )}
    </div>
  )
}
