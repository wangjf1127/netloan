import { MainLayout } from "@/features/layout/components/main-layout"
import { RepaymentPlan } from "@/features/customer-management/components/repayment-plan"

// 为静态导出生成静态参数
export async function generateStaticParams() {
  // 返回一些示例ID，用于静态生成
  return [
    { id: 'demo' },
    { id: '123' },
    { id: '456' },
  ]
}

export default async function RepaymentPlanPage({ params }: { params: Promise<{ id: string }> }) {
  // 确保params已被解析
  const { id } = await params
  
  return (
    <MainLayout>
      <RepaymentPlan customerId={id} />
    </MainLayout>
  )
}
