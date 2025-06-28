import { MainLayout } from "@/features/layout/components/main-layout"
import { RepaymentPlan } from "@/features/customer-management/components/repayment-plan"

export default async function RepaymentPlanPage({ params }: { params: Promise<{ id: string }> }) {
  // 确保params已被解析
  const { id } = await params
  
  return (
    <MainLayout>
      <RepaymentPlan customerId={id} />
    </MainLayout>
  )
}
