"use client"

import { SimpleNotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface ImageMonitoringPageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function ImageMonitoringPage({ sidebarCollapsed, onToggleSidebar }: ImageMonitoringPageProps) {
  return (
    <SimpleNotImplementedPage
      featureName="影像监测查询"
      parentPath="/image-management"
      parentLabel="影像件管理"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
