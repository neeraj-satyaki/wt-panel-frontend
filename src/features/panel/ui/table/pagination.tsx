import { ApplicationSaleDto } from '@/shared/api/generated'
import { UiButton } from '@/shared/ui/components/ui-button'
import { IconArrow } from '@/shared/ui/icons/icon-arrow'

type PaginationProps = { currentPage: number; data: ApplicationSaleDto; nextPage: Function; prevPage: Function }

export function Pagination(props: PaginationProps) {
  return (
    <div className={`w-full flex justify-center gap-2 flex-col items-center `}>
      <span>
        {props.currentPage}/{props.data.info.pages}
      </span>
      <div className="flex gap-2">
        <UiButton
          disabled={props.currentPage === 1}
          variant="primary"
          onClick={() => props.prevPage()}
          className="px-6 py-3"
        >
          <IconArrow direction="left" />
        </UiButton>
        <UiButton
          disabled={props.currentPage === props.data.info.pages}
          variant="primary"
          onClick={() => props.nextPage()}
          className="px-6 py-3"
        >
          <IconArrow direction="right" />
        </UiButton>
      </div>
    </div>
  )
}
