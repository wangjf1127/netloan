import { MainLayout } from "@/features/layout/components/main-layout"
import { LoanTransactionList } from "@/features/loan-core/components/loan-transaction-list"

export default function LoanTransactionPage() {
  return (
    <MainLayout>
      <LoanTransactionList />
    </MainLayout>
  )
}
