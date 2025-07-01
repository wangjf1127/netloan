import { MainLayout } from "@/features/layout/components/main-layout"
import { LoanApprovalList } from "@/features/risk-control"

export default function LoanApprovalPage() {
  return (
    <MainLayout>
      <LoanApprovalList />
    </MainLayout>
  )
}
