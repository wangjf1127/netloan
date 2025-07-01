import { MainLayout } from "@/features/layout/components/main-layout"
import { CreditLedgerDetail } from "@/features/credit-management/components/credit-ledger-detail"

interface CreditLedgerDetailPageProps {
  params: Promise<{
    id: string
  }>
}

// 为静态导出生成静态参数
export async function generateStaticParams() {
  // 返回一些示例ID，用于静态生成
  return [
    { id: 'demo' },
    { id: '456' },
    { id: '123' },
  ]
}

export default async function CreditLedgerDetailPage({ params }: CreditLedgerDetailPageProps) {
  // 确保params已被解析
  const { id } = await params

  return (
    <MainLayout>
      <CreditLedgerDetail creditId={id} />
    </MainLayout>
  )
}
