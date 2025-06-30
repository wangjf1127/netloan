"use client"

import { SimpleNotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface PreLoanPageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function PreLoanPage({ sidebarCollapsed, onToggleSidebar }: PreLoanPageProps) {
  return (
    <SimpleNotImplementedPage
      featureName="贷前管理"
      parentPath="/risk-control"
      parentLabel="全流程风险掌控"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
