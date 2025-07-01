import { MainLayout } from "@/features/layout/components/main-layout"
import { CaseDetail } from "@/features/case-management/components/case-detail"

interface CaseDetailPageProps {
  params: Promise<{
    id: string
  }>
}

// 为静态导出生成静态参数
export async function generateStaticParams() {
  // 返回一些示例ID，用于静态生成
  return [
    { id: 'demo' },
    { id: '123' },
    { id: '456' },
  ]
}

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  // 在异步组件中需要先await params
  const { id } = await params;
  
  return (
    <MainLayout>
      <CaseDetail caseId={id} />
    </MainLayout>
  )
} 