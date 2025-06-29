import { MainLayout } from "@/features/layout/components/main-layout"
import { CreditWithdrawalList } from "@/features/business-query/components/credit-withdrawal-list"

export default function CreditWithdrawalPage() {
  return (
    <MainLayout>
      <CreditWithdrawalList />
    </MainLayout>
  )
}
