import { MainLayout } from "@/features/layout/components/main-layout"
import { LoanApprovalDetail } from "@/features/risk-control"

interface LoanApprovalDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function LoanApprovalDetailPage({ params }: LoanApprovalDetailPageProps) {
  const { id } = await params
  
  return (
    <MainLayout>
      <LoanApprovalDetail approvalId={id} />
    </MainLayout>
  )
}
