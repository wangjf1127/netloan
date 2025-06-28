import { MainLayout } from "@/features/layout/components/main-layout"
import { CustomerDetail } from "@/features/customer-management/components/customer-detail"

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // 确保params已被解析
  const { id } = await params
  
  return (
    <MainLayout>
      <CustomerDetail customerId={id} />
    </MainLayout>
  )
} 