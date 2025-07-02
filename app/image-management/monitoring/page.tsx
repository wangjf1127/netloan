import { MainLayout } from "@/features/layout/components/main-layout"
import { ImageMonitoringList } from "@/features/image-management/components/image-monitoring-list"

export default function ImageMonitoringPage() {
  return (
    <MainLayout>
      <ImageMonitoringList />
    </MainLayout>
  )
}
