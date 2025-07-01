import { MainLayout } from "@/features/layout/components/main-layout"
import { LoanApprovalDetail } from "@/features/risk-control"

interface LoanApprovalDetailPageProps {
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

export default async function LoanApprovalDetailPage({ params }: LoanApprovalDetailPageProps) {
  const { id } = await params
  
  return (
    <MainLayout>
      <LoanApprovalDetail approvalId={id} />
    </MainLayout>
  )
}
