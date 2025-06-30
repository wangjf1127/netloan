"use client"

import { SimpleNotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface DueDiligencePageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function DueDiligencePage({ sidebarCollapsed, onToggleSidebar }: DueDiligencePageProps) {
  return (
    <SimpleNotImplementedPage
      featureName="尽调管理"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
