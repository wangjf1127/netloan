import { MainLayout } from "@/features/layout/components/main-layout"
import { CaseDetail } from "@/features/case-management/components/case-detail"

interface CaseDetailPageProps {
  params: Promise<{
    id: string
  }>
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