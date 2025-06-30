"use client"

import { SimpleNotImplementedPage } from "@/shared/components/ui/not-implemented-page"

interface ApprovalCenterPageProps {
  sidebarCollapsed?: boolean
  onToggleSidebar?: () => void
}

export default function ApprovalCenterPage({ sidebarCollapsed, onToggleSidebar }: ApprovalCenterPageProps) {
  return (
    <SimpleNotImplementedPage
      featureName="审批中心"
      sidebarCollapsed={sidebarCollapsed}
      onToggleSidebar={onToggleSidebar}
    />
  )
}
