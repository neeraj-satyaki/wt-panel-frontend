import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { HeaderLayout } from '@/widgets/header'
import { Moving } from '@/widgets/moving-product'

function MovingPage() {
  return (
    <HeaderLayout>
      <UiHeading level="1">Перемещение</UiHeading>
      <Moving />
    </HeaderLayout>
  )
}

export default authProtectedPage(MovingPage)
