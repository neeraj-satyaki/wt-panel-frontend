import { ApplicationDto } from '@/shared/api/generated'
import { SimilarProductsForChange } from '@/features/(product)/similar-products-for-change'

type Props = {
  item: ApplicationDto
  appId: string
}

export default function ProductFeatBlock({ item, appId }: Props) {
  return (
    <SimilarProductsForChange
      code={item.code}
      appId={appId}
      pose={Number(item.position)}
    />
  )
}
