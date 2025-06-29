import { MainLayout } from "@/features/layout/components/main-layout"
import { LoanContractList } from "@/features/business-query/components/loan-contract-list"

export default function LoanContractPage() {
  return (
    <MainLayout>
      <LoanContractList />
    </MainLayout>
  )
}
