"use client"

import { SimpleNotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface ImageManagementPageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function ImageManagementPage({ sidebarCollapsed, onToggleSidebar }: ImageManagementPageProps) {
  return (
    <SimpleNotImplementedPage
      featureName="影像件管理"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
