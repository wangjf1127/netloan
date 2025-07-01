import { MainLayout } from "@/features/layout/components/main-layout"
import { LoanRecords } from "@/features/customer-management/components/loan-records"

// 为静态导出生成静态参数
export async function generateStaticParams() {
  // 返回一些示例ID，用于静态生成
  return [
    { id: 'demo' },
    { id: '123' },
    { id: '456' },
  ]
}

export default async function LoanRecordsPage({ params }: { params: Promise<{ id: string }> }) {
  // 确保params已被解析
  const { id } = await params
  
  return (
    <MainLayout>
      <LoanRecords customerId={id} />
    </MainLayout>
  )
} 