"use client"

import { SimpleNotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface RiskControlPageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function RiskControlPage({ sidebarCollapsed, onToggleSidebar }: RiskControlPageProps) {
  return (
    <SimpleNotImplementedPage
      featureName="全流程风险掌控"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
