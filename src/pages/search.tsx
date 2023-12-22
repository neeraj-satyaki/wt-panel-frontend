import { SearchApp } from '@/features/(search)/search-app'
import { SearchProductQr } from '@/features/(search)/search-product'
import { authProtectedPage } from '@/features/auth/ui/protected/auth-protected-page'
import { UiHeading } from '@/shared/ui/components/ui-heading'
import { HeaderLayout } from '@/widgets/header'

function SearchPage() {
  return (
    <HeaderLayout>
      <main className="space-y-4">
        <UiHeading level={'1'}>Поиск</UiHeading>
        <div className="flex flex-col gap-2 744:flex-row">
          <SearchProductQr />
          <SearchApp />
        </div>
      </main>
    </HeaderLayout>
  )
}

export default authProtectedPage(SearchPage)
