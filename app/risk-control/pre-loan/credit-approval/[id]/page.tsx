import { MainLayout } from "@/features/layout/components/main-layout"
import { CreditApprovalDetail } from "@/features/risk-control/components/credit-approval-detail"

interface CreditApprovalDetailPageProps {
  params: Promise<{
    id: string
  }>
}

// 为静态导出生成静态参数
export async function generateStaticParams() {
  // 返回一些示例ID，用于静态生成
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ]
}

export default async function CreditApprovalDetailPage({ params }: CreditApprovalDetailPageProps) {
  const { id } = await params

  return (
    <MainLayout>
      <CreditApprovalDetail approvalId={id} />
    </MainLayout>
  )
}
