import { MainLayout } from "@/features/layout/components/main-layout"
import { CreditApplicationList } from "@/features/business-query/components/credit-application-list"

export default function CreditApplicationPage() {
  return (
    <MainLayout>
      <CreditApplicationList />
    </MainLayout>
  )
}
