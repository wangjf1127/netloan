"use client"

import { SimpleNotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface PostLoanPageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function PostLoanPage({ sidebarCollapsed, onToggleSidebar }: PostLoanPageProps) {
  return (
    <SimpleNotImplementedPage
      featureName="贷后管理"
      parentPath="/risk-control"
      parentLabel="全流程风险掌控"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
