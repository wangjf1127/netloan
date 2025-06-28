import { MainLayout } from "@/features/layout/components/main-layout"
import { LoanRecords } from "@/features/customer-management/components/loan-records"

export default async function LoanRecordsPage({ params }: { params: Promise<{ id: string }> }) {
  // 确保params已被解析
  const { id } = await params
  
  return (
    <MainLayout>
      <LoanRecords customerId={id} />
    </MainLayout>
  )
} 