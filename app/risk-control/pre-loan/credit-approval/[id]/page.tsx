import { MainLayout } from "@/features/layout/components/main-layout"
import { CreditApprovalDetail } from "@/features/risk-control/components/credit-approval-detail"

interface CreditApprovalDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CreditApprovalDetailPage({ params }: CreditApprovalDetailPageProps) {
  const { id } = await params

  return (
    <MainLayout>
      <CreditApprovalDetail approvalId={id} />
    </MainLayout>
  )
}
