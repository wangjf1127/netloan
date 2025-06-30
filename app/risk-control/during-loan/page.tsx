"use client"

import { SimpleNotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface DuringLoanPageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function DuringLoanPage({ sidebarCollapsed, onToggleSidebar }: DuringLoanPageProps) {
  return (
    <SimpleNotImplementedPage
      featureName="贷中管理"
      parentPath="/risk-control"
      parentLabel="全流程风险掌控"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
