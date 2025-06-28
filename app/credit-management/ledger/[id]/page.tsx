import { MainLayout } from "@/features/layout/components/main-layout"
import { CreditLedgerDetail } from "@/features/credit-management/components/credit-ledger-detail"

interface CreditLedgerDetailPageProps {
  params: Promise<{
    id: string
  }>
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
