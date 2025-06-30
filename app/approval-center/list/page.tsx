"use client"

import { SimpleNotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface ApprovalListPageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function ApprovalListPage({ sidebarCollapsed, onToggleSidebar }: ApprovalListPageProps) {
  return (
    <SimpleNotImplementedPage
      featureName="审批列表"
      parentPath="/approval-center"
      parentLabel="审批中心"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
