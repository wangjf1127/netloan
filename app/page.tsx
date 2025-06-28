import { MainLayout } from "@/features/layout/components/main-layout"
import { CaseList } from "@/features/case-management/components/case-list"

export default function HomePage() {
  return (
    <MainLayout>
      <CaseList />
    </MainLayout>
  )
}
